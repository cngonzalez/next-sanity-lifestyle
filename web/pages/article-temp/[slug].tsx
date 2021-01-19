import { GetStaticProps } from 'next'
import { NavBar } from '$components'
import { Stack, Card, Heading, Text, Container } from '@sanity/ui'
import { Category } from '../../types'
import { client, urlFor } from '$sanityUtils'
import BlockContent from '@sanity/block-content-to-react'

export default function ArticlePage(
  {categories, article}
    : {categories: Category[], article: any[] | any }) {

  return (
    <>
      <NavBar categories={categories} />
        <Card padding={[3, 3, 4, 5]}>
          <Stack space={[3, 3, 4, 5]}>
              <img src={urlFor(article.imageRef)
                          .width(1200)
                          .height((4 / 16) * 1200)
                          .fit("crop")
                          .auto("format")
                          .url()} />
              <Heading size={[2, 3, 4]} padding={4}>
                { article.title }
              </Heading>
              <Text>
                { article.content[0].children[0].text }
              </Text>
          </Stack>
        </Card>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const articleSlugs = await client.fetch(
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
  const article = await client.fetch(`
      *[_type == "article"]{
          title, 
          "slug": slug.current,
          authors,
          content,
          "imageRef": heroImage.asset._ref
      }[0]`)

  return ({
    props: {
      //later do this in just one query?
      categories: await client.fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      article: article
    }
  })
}

