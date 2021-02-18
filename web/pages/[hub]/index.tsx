import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { groq } from "next-sanity"

import { getClient, usePreviewSubscription } from '$sanityUtils'
import { Box, Container, Heading, Inline } from '@sanity/ui'
import { NavBar, SubsectionBar, FeaturedArticle,
  TextOverlayFeature, TextUnderFeature, SolidBlockFeature } from '$components'
import { Category, Article, SubsectionArticles, CategoryFeature } from '../../types'
import { GiWomanElfFace } from 'react-icons/gi'

const categoryQuery = groq`
  *[_type == 'category' && slug.current == $hub][0]
    {
      "categoryId": _id,
      name,
      featuredArticleDisplay,
      featuredArticle->{
        _id,
        title,
        "slug": slug.current,
        "imageRef": heroImage.asset._ref,
        "subsection": subsection->{name, "slug": slug.current},
        "category": subsection->category->{name, "slug": slug.current},
        content
      }
    }`

const subsectionArticleQuery = groq`
  *[_type == 'subsection' && category._ref == $id]
    {
      name,
      "slug": slug.current,
      "articles": *[_type == 'article' 
    && references(^._id) && _id != $featuredArticleId] 
        | order('publishedDate' desc)[0..1]{
           _id,
           title,
           "slug": slug.current,
           "imageRef": heroImage.asset._ref,
           "subsection": subsection->{name, "slug": slug.current},
           "category": subsection->category->{name, "slug": slug.current},
        }
    }`

export default function Hub({categories, subsectionArticleData, categoryFeature, preview}
  : {categories: Category[],
    subsectionArticleData: SubsectionArticles[],
    categoryFeature: CategoryFeature,
    preview: boolean}) {

  const router = useRouter()
  const hub = router.query.hub

  const {data: category} = usePreviewSubscription(categoryQuery, {
    params: {hub: hub},
    initialData: categoryFeature,
    enabled: preview || router.query.preview !== null,
  })


  const featuredArticle = category.featuredArticle
  let featuredArticleDisplay;

  switch(category.featuredArticleDisplay) {
    case 'Text Below':
      featuredArticleDisplay = <TextUnderFeature article={featuredArticle} hub={hub} />
      break;
    case 'Text Overlay':
      featuredArticleDisplay = <TextOverlayFeature article={featuredArticle} hub={hub} />
      break;
    case '50/50 Card':
      featuredArticleDisplay = <SolidBlockFeature article={featuredArticle} hub={hub} />
      break;
    default: 
      featuredArticleDisplay = <TextUnderFeature article={featuredArticle} hub={hub} />
  }



  const {data: subsectionArticles} = usePreviewSubscription(subsectionArticleQuery, {
    params: {id: category.categoryId,
           featuredArticleId: category.featuredArticle._id},
    initialData: subsectionArticleData,
    enabled: preview || router.query.preview !== null,
  })

  const subsectionRows = subsectionArticles
          .filter(sub => sub.articles.length)
          .map((subsection, i) => (
            <SubsectionBar hub={hub} subsectionArticles={subsection} key={i} /> 
          )
  )

    

  return (
    <>
      <NavBar categories={categories} />
      <Container width={1}>
        <Box paddingY={[3,5]}>
          <Heading size={2}>
            <Inline>
              <GiWomanElfFace style={{margin: "0 1rem"}}/>
              {category.name}
            </Inline>
          </Heading>
        </Box>
          { featuredArticleDisplay }
        <Box>
          { subsectionRows }
        </Box>
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  //TODO -- add campaign, which would also live at this level of slug
  const categories = await getClient().fetch(
    `*[_type == "category"].slug.current`)

    return {
      ...{paths: categories.map((cat) => ({params: {hub: cat}}))},
     fallback: true
   }
}

export const getStaticProps: GetStaticProps = async ({params, preview = false }) => {

  const category = await getClient(preview).fetch(
        categoryQuery, params)

  const subsectionArticles = await getClient(preview).fetch(
        subsectionArticleQuery, {id: category.categoryId,
             featuredArticleId: category.featuredArticle._id})

  return ({
    props: {
      categories: await getClient(preview).fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      subsectionArticleData: subsectionArticles,
      categoryFeature: category,
      preview
    }
  })
}

