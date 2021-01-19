import { Grid } from '@sanity/ui'
import { GetStaticPaths, GetStaticProps } from 'next'
import { client } from '$sanityUtils'
import { useRouter } from 'next/router'
import { NavBar, ArticlePane } from '$components'
import { Category, ArticleExcerpt } from '../../types'


export default function Hub({categories, articles}
  : {categories: Category[], articles: ArticleExcerpt[]}) {

    const router = useRouter()
    console.log(articles)
    const hub = router.query.hub
    const articlePanes = articles.map(
      (article, i) => (
        <ArticlePane article={article} hub={hub} key={i} />)
    )

  return (
    <>
      <NavBar categories={categories} />
      <Grid columns={[2, 3, 4]} gap={[2, 2, 3, 4]}>
        { articlePanes }
      </Grid>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  //TODO -- add campaign, which would also live in this pattern
  const subsectionSlugs = await client.fetch(
    `*[_type == "category"]{'slug': slug.current}`)

  const paths = {paths: subsectionSlugs.map(
    (slug) => ({params: {hub: slug.slug}}))}
    return {
      ...paths,
     fallback: true
   }
}

export const getStaticProps: GetStaticProps = async (context) => {
  // && subsection.category.slug == ${context.params.hub}
  const rawArticles = await client.fetch(`
      *[_type == "article"]{
          title, 
          "slug": slug.current,
          content,
          "subsectionName": subsection->name,
          "imageRef": heroImage.asset._ref
      }`)

  return ({
    props: {
      //later do this in just one query?
      categories: await client.fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      articles: rawArticles
    }
  })
}

