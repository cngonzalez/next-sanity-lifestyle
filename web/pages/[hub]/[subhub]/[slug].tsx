import { GetStaticProps, GetStaticPaths } from 'next'
import Error from 'next/error'
import { groq } from 'next-sanity'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import { Stack, Card, Box, Heading, Text, Container, Flex } from '@sanity/ui'
import { NavBar, SocialBar, Breadcrumbs } from '$components'
import { Category, Article, ArticleData } from '../../types'
import { getClient, urlFor, PortableText, usePreviewSubscription } from '$sanityUtils'
import { handleGroupedItems } from '$helpers'


const articleQuery = groq`
      *[_type == "article" && slug.current == $slug]{
          title, 
          "slug": slug.current,
          authors,
          "subsection": subsection->{name, "slug": slug.current},
          "category": subsection->category->{name, "slug": slug.current},
          content[]{
              ...,
              _type == 'listItem'=>{
                products[]->{
                  name, price, description, manufacturer,
                  'slug': slug.current,
                  'image': productImage.asset._ref
                }
              },
              _type == 'productsDisplay'=>{
                products[]->{
                  name, price, description, manufacturer,
                  'slug': slug.current,
                  'image': productImage.asset._ref
                }
              }
            },
          "imageRef": heroImage.asset._ref
         }[0]`


export default function ArticlePage({categories, articleData, preview}
  : {categories: Category[], articleData: ArticleData, preview: boolean}) {

  const router = useRouter();
  if (!router.isFallback && !articleData?.slug) {
    return <Error statusCode={404} />;
  }

  const {data: article} = usePreviewSubscription(articleQuery, {
    params: {slug: articleData.slug},
    initialData: articleData,
    enabled: preview || router.query.preview !== null,
  })

  let content = handleGroupedItems(
    article.content, "listItem", {_key: "orientation", _value: "vertical"})

      
  return (
    <>
      <NavBar categories={categories} />
      <Breadcrumbs article={article} />

      <Flex>
        <Box paddingLeft={3} flex={2}>
          <Stack space={2}>
            <SocialBar />
            <Box style={{maxHeight: '100vh'}}>
              <img src={urlFor(article.imageRef) } 
                style={{width: "100%", height: "100%", objectFit: "cover"}}/>
            </Box>
              <Box padding={[1, 3, 4]}>
                <Heading size={[2, 3, 4]} padding={4}>
                  { article.title }
                </Heading>
                <Text>
                  <PortableText blocks={content} />
                </Text>
              </Box>
            </Stack>
          </Box>
         <Box padding={1} flex={[0, 1]} />
        </Flex>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (context) => {

  const articleSlugs = await getClient().fetch(
    `*[_type == "article"]{
      'slug': slug.current,
      'subhub': subsection->slug.current,
      'hub': subsection->category->slug.current
    }`)

  const paths = {paths: articleSlugs.map(
    (slugs) => ({params: slugs}))}
    return {
      ...paths,
     fallback: true
   }
}


export const getStaticProps: GetStaticProps = async ({params, preview = false}) => {

  const article = await getClient(preview).fetch(articleQuery, params)

  return ({
    props: {
      categories: await getClient(preview).fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      articleData: article
    }
  })
}

