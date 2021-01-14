import { GetStaticProps } from 'next'
import client from '../../client'
import { NavBar } from '$components'


export default function ArticlePage() {

  return (
    <>
      <NavBar categories={categories} />
      This is temporary! No one should be here!
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
