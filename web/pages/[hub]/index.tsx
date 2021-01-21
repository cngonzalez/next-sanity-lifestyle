import { Grid } from '@sanity/ui'
import { GetStaticPaths, GetStaticProps } from 'next'
import { sanityClient } from '$sanityUtils'
import { useRouter } from 'next/router'
import { NavBar, SubsectionBar, FeaturedArticle } from '$components'
import { Category, ArticleExcerpt, SubsectionArticles } from '../../types'
import { groq } from "next-sanity";


export default function Hub({categories, subsectionArticles, featuredArticle}
  : {categories: Category[],
    subsectionArticles: SubsectionArticles[],
    featuredArticle: ArticleExcerpt}) {

    const router = useRouter()
    const hub = router.query.hub

    const subsectionRows = subsectionArticles.map((subsection, i) => (
      <SubsectionBar hub={hub} subsectionArticles={subsection} key={i} /> 
      )
    )

  return (
    <>
      <NavBar categories={categories} />
      <FeaturedArticle article={featuredArticle} hub={hub} />
      { subsectionRows }
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  //TODO -- add campaign, which would also live at this level of slug
  const categories = await sanityClient.fetch(
    `*[_type == "category"].slug.current`)

    return {
      ...{paths: categories.map((cat) => ({params: {hub: cat}}))},
     fallback: true
   }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const categoryQuery = groq`
  *[_type == 'category' && slug.current == $hub][0]
  {
    _id,
    featuredArticle->{
      _id,
      title,
      "slug": slug.current,
      "imageRef": heroImage.asset._ref,
      "subsectionName": subsection->name,
      content
    }
  }`

  const category = await sanityClient.fetch(
        categoryQuery, {hub: context.params.hub})

  const subsectionArticles = await sanityClient.fetch(
     groq`*[_type == 'subsection' && category._ref == $id]
        {
          name,
          "slug": slug.current,
          "articles": *[_type == 'article' 
        && references(^._id) && _id != $featuredArticleId] 
            | order('publishedDate' desc)[0..1]{
               _id,
               title,
               "slug": slug.current,
               "imageRef": heroImage.asset._ref}
        }`, {id: category._id,
             featuredArticleId: category.featuredArticle._id})

  return ({
    props: {
      categories: await sanityClient.fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      subsectionArticles: subsectionArticles,
      featuredArticle: category.featuredArticle
    }
  })
}

