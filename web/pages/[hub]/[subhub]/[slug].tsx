import { GetStaticProps } from 'next'
import { groq } from 'next-sanity'
import { NavBar, SocialBar, Breadcrumbs } from '$components'
import { Stack, Card, Box, Heading, Text, Container, Flex } from '@sanity/ui'
import { Category, Article } from '../../types'
import { sanityClient, urlFor, PortableText } from '$sanityUtils'
import { handleGroupedItems } from '$helpers'
import BlockContent from '@sanity/block-content-to-react'
import styled from 'styled-components'

const ShopTheStoryBox = styled.div`
  flex: 1;
  @media (max-width: 768px) {
    flex: 0;
    display: collapse;
  }
`

export default function ArticlePage({categories, article}
    : {categories: Category[], article: Article}) {
      
      let content = handleGroupedItems(
        article.content, "listItem", {_key: "orientation", _value: "vertical"})

  return (
    <>
      <NavBar categories={categories} />
      <Breadcrumbs article={article} />

      <Flex>
        <Box paddingLeft={3} flex={[1, 2, 3]}>
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
         <ShopTheStoryBox padding={1} />
        </Flex>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const articleSlugs = await sanityClient.fetch(
    `*[_type == "article"]{
      'slug': slug.current,
      'subhub': subsection->slug.current,
      'hub': subsection->category->slug.current
    }`)

  const paths = {paths: articleSlugs.map(
    (slugObj) => ({params: slugObj}))}
    return {
      ...paths,
     fallback: true
   }
}


export const getStaticProps: GetStaticProps = async (context) => {

  const article = await sanityClient.fetch(groq`
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
      }[0]`, context.params)

  return ({
    props: {
      categories: await sanityClient.fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      article: article
    }
  })
}

