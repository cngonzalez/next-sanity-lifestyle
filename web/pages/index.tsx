import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { groq } from 'next-sanity'

import { Card, Container, Flex, Stack, Text } from '@sanity/ui'

import { Category, Article } from '../types'
import { getClient, usePreviewSubscription } from '$utils/sanity'
import { IndexArticleGrid, NavBar, SubsectionBar } from '$components'

const indexQuery = groq`
{"featuredArticles": *[_type == 'siteSettings'][0]{featuredArticles[]->{
        _id,
        title,
        text,
        "slug": slug.current,
        "imageRef": heroImage.asset._ref,
        "subsection": subsection->{name, "slug": slug.current},
        "category": subsection->category->{name, "slug": slug.current},
        excerpt,
        publishedDate
      }}.featuredArticles[],
    "recentArticles": *[_type == 'article'] | order(publishedDate desc)[0...20]{
        _id,
        title,
        text,
        "slug": slug.current,
        "imageRef": heroImage.asset._ref,
        "subsection": subsection->{name, "slug": slug.current},
        "category": subsection->category->{name, "slug": slug.current},
        excerpt,
        publishedDate
      },
  }
`

function IndexPage({categories, featuredArticleData, recentArticleData, preview}
  : {categories: Category[], featuredArticleData: Article[], recentArticleData: Article[], preview: boolean}) {

  const router = useRouter()
  const hub = router.query.hub ?? ""

  const {data: {featuredArticles, recentArticles}} = usePreviewSubscription(indexQuery, {
    initialData: {
      featuredArticles: featuredArticleData,
      recentArticles: recentArticleData},
    enabled: preview || router.query.preview !== null,
  })


  //if there aren't enough featured articles, supplement with most recent
  let supplementedFeatures = []
  if (!featuredArticles || !featuredArticles.length) {
    supplementedFeatures = recentArticles.splice(0, 3)
  } else {
    supplementedFeatures = [
      ...featuredArticles,
      ...recentArticles.splice(0, 3 - featuredArticles.length)
    ]
  }

  const articlesByMonth = []
  recentArticles.forEach(article => {
    const date = new Date(article.publishedDate)
    const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const stringDate = `${month} ${year}`
    if (!articlesByMonth.length || articlesByMonth[articlesByMonth.length - 1].name != stringDate) {
      articlesByMonth.push({
        name: stringDate,
        articles: [article]
      })
    } else {
      articlesByMonth[articlesByMonth.length - 1].articles.push(article)
    }
  })

  return (
    <>
      <NavBar categories={categories} />
      <Card flex={1} paddingX={[3, 4, 5]} paddingY={[5, 6, 7, 8]}>
        <Stack space={[3, 4, 5]}>
          <Container width={1}>
            <IndexArticleGrid articles={supplementedFeatures} /> 
            { articlesByMonth.map((month, i) => (
              <SubsectionBar hub="" subsectionArticles={month} key={i} />
            ))}
          </Container>
        </Stack>
      </Card>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({params, preview = false }) => {
  const {featuredArticles, recentArticles} = await getClient(preview).fetch(indexQuery)
  return ({
    props: {
      categories: await getClient(preview).fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      featuredArticleData: featuredArticles,
      recentArticleData: recentArticles
    }
  })
}

export default IndexPage;


//logic for featured index articles
//either they're set or are the most recent across the board
//all set come before auto

