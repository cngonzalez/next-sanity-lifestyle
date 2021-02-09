import { Card } from '@sanity/ui'
import { GetStaticPaths, GetStaticProps } from 'next'
import { sanityClient } from '$sanityUtils'
import { useRouter } from 'next/router'
import { NavBar, SubsectionBar, FeaturedArticle } from '$components'
import { Category, Article, SubsectionArticles } from '../../types'
import { groq } from "next-sanity";


export default function SubsectionHub({articles}
  :{articles: Article[]}) {

    return (<div />)
}

export const getStaticPaths: GetStaticPaths = async (context) => {

  const cats = await sanityClient.fetch(`*[_type == 'category']{
    'slug': slug.current,
    'subsectionNames': *[_type == 'subsection' && references(^._id)].slug.current
  }`)

  const subHubPaths = []
  cats.forEach(cat => {
    cat.subsectionNames.forEach(sub => {
      subHubPaths.push({params: {subhub: sub, hub: cat.slug}})
    })
  })


  return {
    ...{paths: subHubPaths},
   fallback: true
  }

}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context)
  const articleQuery = groq`
  *[_type == 'subsection' && slug.current == $subhub][0]
    {"articles": *[_type == 'article' && references(^._id)] 
            | order('publishedDate' desc) {
               _id,
               title,
               "slug": slug.current,
               "imageRef": heroImage.asset._ref}
    }`

    const articles = await sanityClient.fetch(articleQuery, context.params)

    return ({
      props: {
        categories: await sanityClient.fetch(`*[_type == "category"]{name,'slug': slug.current}`),
        articles: articles
      }
    })
  }

