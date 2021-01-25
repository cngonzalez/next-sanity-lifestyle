import {Container, Heading, Card, Inline } from '@sanity/ui'
import {Article} from '../types'
import Link from 'next/link'
import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'
import { ArticlePane } from '$components'


function generateHeights() {
  const min = 25;
  const max = 75;
  const difference = Math.floor(Math.random() * (max-min)) + min
  const order = Math.random() * 2
  if (order > 1) {
    return [500 + difference, 500 - difference]
  } else {
    return [500 - difference, 500 + difference]
  }
  
}

export function SubsectionBar({hub, subsectionArticles}
  : {hub: string, subsectionArticles: SubsectionArticles}) {


    const heights: Integer[] = generateHeights()
    const articlePanes = subsectionArticles.articles.map((article, i) => (
      <ArticlePane article={article} hub={hub} key={i} height={heights[i]} />) 
    )

    return (
      <Container width={1} padding={2, 3, 3, 3}>
        <Card borderBottom padding={1, 3}>
          <Link href={`/${hub}/${subsectionArticles.slug}`}>
            <Heading size={1}>
                { subsectionArticles.name }
            </Heading>
          </Link>
        </Card>
        <Inline align='center' wrap='wrap'>
          { articlePanes }
        </Inline>

      </Container>
    )
    
  }
