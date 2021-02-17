import { GetStaticProps, GetStaticPaths } from 'next'
import Error from 'next/error'
import { Product, Category } from '../../types'
import { getClient, urlFor, PortableText, usePreviewSubscription } from '$sanityUtils'
import { groq } from "next-sanity"
import { NavBar } from '$components'
import { Stack, Inline, Button, Box, Heading, Text, Badge, Flex } from '@sanity/ui'
import { useRouter } from 'next/router'

  const productQuery = groq`
    *[_type == 'product' && slug.current == $slug][0]
    {
      'slug': slug.current,
      'image': productImage.asset._ref,
      name,
      description,
      price,
      manufacturer
    }`

export default function ProductPage({categories, productData, preview}
  : {categories: Category[], productData: Product, preview: boolean}) {

  const router = useRouter();
  if (!router.isFallback && !productData?.slug) {
    return <Error statusCode={404} />;
  }

  const {data: product} = usePreviewSubscription(productQuery, {
    params: {slug: productData.slug},
    initialData: productData,
    enabled: preview || router.query.preview !== null,
  })

  return (
    <>
      <NavBar categories={categories} />
      <Flex padding={4} wrap="wrap">
        <Box flex={1} padding={5} style={{minWidth: '300px'}}>
            <img 
              style={
                {height: '100%',
                 width: '100%',
                 objectFit: 'cover',
                 borderRadius: '50%',
                 maxWidth: '500px'
                }
              }
              src={urlFor(product.image)
                    .height(2000)
                    .width(2000)}/>
        </Box> 
        <Box flex={1} margin={4} style={{minWidth: '300px'}}>
          <Stack space={4} >
            <Text style={{textTransform: 'uppercase', fontWeight: 'bold'}}>
              { product.manufacturer }
            </Text>
            <Heading size={4}>
              {product.name}
            </Heading>
            <Text>
              <Inline space={2}>
                <span>US ${product.price}</span>
                <Badge mode='outline' tone='primary'>Free Shipping!</Badge>
              </Inline>
            </Text>
            <hr />
            <Button text='Add to Bag' mode='ghost' /> 
            <hr /> 
            <Heading size={1}>
              Product Details
            </Heading>
            <Text>
              { product.description }
            </Text>

          </Stack>
        </Box>
      </Flex> 
    </>
    )
}
            
export const getStaticPaths: GetStaticPaths = async (context) => {
  const productSlugs = await getClient().fetch(
    `*[_type == "product"]{
      'slug': slug.current
    }`)

  const paths = {paths: productSlugs.map(
    (slugObj) => ({params: slugObj}))}
    return {
      ...paths,
     fallback: true
   }
}

export const getStaticProps: GetStaticProps = async ({params, preview = false}) => {
  const product = await getClient(preview).fetch(productQuery, params)


  return ({
    props: {
      categories: await getClient(preview).fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      productData: product
    }
  })
}
