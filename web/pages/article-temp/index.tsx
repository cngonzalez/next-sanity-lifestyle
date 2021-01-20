import { GetStaticProps } from 'next'
import { sanityClient } from '$sanityUtils'
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
  const articleSlugs = await sanityClient.fetch(
    `*[_type == "article"]{'slug': slug.current}`)

  const paths = {paths: articleSlugs.map(
    (slug) => ({params: {slug: slug.slug}}))}
    return {
      ...paths,
     fallback: true
   }
}
