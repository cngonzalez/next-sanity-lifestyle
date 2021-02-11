import { Product, Category } from '../../types'
import { sanityClient, urlFor, PortableText } from '$sanityUtils'
import { groq } from "next-sanity"
import { NavBar } from '$components'
import { Stack, Inline, Button, Box, Heading, Text, Badge, Flex } from '@sanity/ui'

export default function ProductPage({categories, product}
    : {categories: Category[], product: Product}) {

  return (
    <>
      <NavBar categories={categories} />
      <Flex padding={4}>
        <Box flex={1} padding={5}>
            <img 
              style={
                {height: '100%',
                 width: '100%',
                 objectFit: 'cover',
                 borderRadius: '50%'
                }
              }
              src={urlFor(product.image)
                    .height(400)
                    .width(400)}/>
        </Box> 
        <Box flex={1} margin={4}>
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
  const productSlugs = await sanityClient.fetch(
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

export const getStaticProps: GetStaticProps = async (context) => {
  const product = await sanityClient.fetch(groq`
    *[_type == 'product' && slug.current == $slug][0]
    {
      'slug': slug.current,
      'image': productImage.asset._ref,
      name,
      description,
      price,
      manufacturer
    }`, context.params)


  return ({
    props: {
      categories: await sanityClient.fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      product: product
    }
  })
}
