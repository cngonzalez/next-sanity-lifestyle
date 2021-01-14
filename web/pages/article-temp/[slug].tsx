import { GetStaticProps } from 'next'
import { NavBar, Stack, Box } from '$components'
import { Category } from '../../types'
import client from '../../client'

export default function ArticlePage(
  {categories, article}
    : {categories: Category[], article: any[] | any }) {
      console.log(article)

  return (
    <>
      <NavBar categories={categories} />
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

