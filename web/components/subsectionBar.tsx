import {Container, Heading, Card, Flex, Grid } from '@sanity/ui'
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

    const heading = (<Heading size={1}>{ subsectionArticles.name }</Heading>)

    return (
      <Container width={1}>
        <Card borderBottom style={{backgroundColor: "#FCFCFF"}} paddingTop={5} paddingBottom={3}>
          { (subsectionArticles.slug && subsectionArticles.slug != 'undefined') ? 
            (<Link href={`/${hub}/${subsectionArticles.slug}`}>
              { heading }
            </Link> ) :
            <>{ heading }</>
          }
        </Card>
        <Flex wrap="wrap" justify='space-between'>
          { articlePanes }
        </Flex>

      </Container>
    )
    
  }
