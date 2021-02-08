import { GetStaticProps } from 'next'
import { NavBar } from '$components'
import { Stack, Card, Heading, Text, Container, Flex } from '@sanity/ui'
import { Category, Article } from '../../types'
import { sanityClient, urlFor, PortableText } from '$sanityUtils'
import { handleGroupedItems } from '$helpers'
import BlockContent from '@sanity/block-content-to-react'

export default function ArticlePage(
  {categories, article}
    : {categories: Category[], article: Article}) {
      
      let content = handleGroupedItems(
        article.content, "listItem", {_key: "orientation", _value: "vertical"})

  return (
    <>
      <NavBar categories={categories} />
      <Flex>
        <Card padding={[1, 3, 4, 5]} flex={[1, 2, 3]}>
          <Stack space={2}>
            <Card style={{height: "20rem"}}>
              <img src={urlFor(article.imageRef)
                          .fit("crop")
                          .auto("format")
                          .url()} 
                style={{width: "100%", height: "100%", objectFit: "cover"}}/>
              </Card>
              <Card padding={[1, 3, 4, 5]} flex={[1, 2, 3]}>
                <Heading size={[2, 3, 4]} padding={4}j>
                  { article.title }
                </Heading>
                <Text>
                  <PortableText blocks={content} />
                </Text>
              </Card>
            </Stack>
          </Card>
          <Card padding={1} flex={1} />
        </Flex>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const articleSlugs = await sanityClient.fetch(
    `*[_type == "article"]{'slug': slug.current}`)

  const paths = {paths: articleSlugs.map(
    (slug) => ({params: {slug: slug.slug}}))}
    return {
      ...paths,
     fallback: true
   }
}


export const getStaticProps: GetStaticProps = async (context) => {
  // && slug.current == ${context.params.hub}
  const article = await sanityClient.fetch(`
      *[_type == "article"]{
          title, 
          "slug": slug.current,
          authors,
          content[]{
              ...,
              _type == 'listItem'=>{
                products[]->{
                  name, price, 
                  'image': productImage.asset._ref
                }
              }
            },
          "imageRef": heroImage.asset._ref
      }[0]`)

  return ({
    props: {
      //later do this in just one query?
      categories: await sanityClient.fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      article: article
    }
  })
}

