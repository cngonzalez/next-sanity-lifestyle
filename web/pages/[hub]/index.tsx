import { Grid } from '@sanity/ui'
import { GetStaticPaths, GetStaticProps } from 'next'
import { sanityClient } from '$sanityUtils'
import { useRouter } from 'next/router'
import { NavBar, ArticlePane } from '$components'
import { Category, ArticleExcerpt } from '../../types'


export default function Hub({categories, articles}
  : {categories: Category[], articles: ArticleExcerpt[]}) {

    const router = useRouter()
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
  //TODO -- add campaign, which would also live at this level of slug
  const categories = await sanityClient.fetch(
    `*[_type == "category"]{_id, 'slug': slug.current}`)

  const paths = {paths: categories.map(
       (cat) => ({params: {id: cat._id, hub: cat.slug}}))}
    return {
      ...paths,
     fallback: true
   }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const featuredArticle = await sanityClient.fetch(
    `*[_type == 'category' && _id == $id][0]{
      featuredArticle->{
        _id,
        title,
        "slug": slug.current,
        "imageRef": heroImage.asset._ref
        `, {id: context.params.id}).featuredArticle

  const rawArticles = await sanityClient.fetch(
     `*[_type == 'subsection' && category._ref == $id]
        {
          name,
          "articles": *[_type == 'article' 
        && references(^._id) && _id != $featuredArticleId] 
            | order('publishedDate' desc)[0..3]{
                _id,
                title,
               "slug": slug.current,
               content,
               "imageRef": heroImage.asset._ref}
        }`, {id: context.params.id,
             featuredArticleId: featuredArticle._id})

  return ({
    props: {
      categories: await sanityClient.fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      articles: rawArticles
    }
  })
}

