import {Container, Heading, Card, Flex } from '@sanity/ui'
import {Article} from '../types'
import Link from 'next/link'
import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'
import { ArticlePane } from '$components'

export function SubsectionBar({hub, subsectionArticles}
  : {hub: string, subsectionArticles: SubsectionArticles}) {


    const articlePanes = subsectionArticles.articles.map((article, i) => (
      <ArticlePane article={article} hub={hub} key={i} />) 
    )

    return (
      <Container width={1} padding={2, 3, 3, 3}>
        <Card borderBottom style={{backgroundColor: "#FCFCFF"}} padding={1, 3}>
          <Link href={`/${hub}/${subsectionArticles.slug}`}>
            <Heading size={1}>
                { subsectionArticles.name }
            </Heading>
          </Link>
        </Card>
        <Flex wrap="wrap">
          { articlePanes }
        </Flex>

      </Container>
    )
    
  }
