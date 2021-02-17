import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { groq } from "next-sanity"

import { getClient, usePreviewSubscription } from '$sanityUtils'
import { Card } from '@sanity/ui'
import { NavBar, SubsectionBar, FeaturedArticle } from '$components'
import { Category, Article, SubsectionArticles, CategoryFeature } from '../../types'

const categoryQuery = groq`
  *[_type == 'category' && slug.current == $hub][0]
    {
      "categoryId": _id,
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

export default function Hub({categories, subsectionArticleData, featuredArticleData, preview}
  : {categories: Category[],
    subsectionArticleData: SubsectionArticles[],
    featuredArticleData: CategoryFeature,
    preview: boolean}) {

    const router = useRouter()
    const hub = router.query.hub

    const {data: category} = usePreviewSubscription(categoryQuery, {
      params: {hub: hub},
      initialData: featuredArticleData,
      enabled: preview || router.query.preview !== null,
    })

    const featuredArticle = category.featuredArticle


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
      <FeaturedArticle article={featuredArticle} hub={hub} />
      <Card style={{backgroundColor: "#FCFCFF"}}>
        { subsectionRows }
      </Card>
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
      featuredArticleData: category,
      preview
    }
  })
}

