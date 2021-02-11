import { Product, Category } from '../../types'
import { sanityClient, urlFor, PortableText } from '$sanityUtils'
import { groq } from "next-sanity"
import { NavBar } from '$components'
import { Stack, Card, Box, Heading, Text, Container, Flex } from '@sanity/ui'

export default function ProductPage({categories, product}
    : {categories: Category[], product: Product}) {

  return (
    <>
      <NavBar categories={categories} />
      <Heading>
        {product.name}
      </Heading>
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
