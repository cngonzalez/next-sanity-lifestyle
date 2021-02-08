import {Heading, Stack, Box } from '@sanity/ui'
import {Article} from '../types'
import Link from 'next/link'
import BlockContent from '@sanity/block-content-to-react'
import { urlFor } from '$sanityUtils'

export function ArticlePane({article, hub, height}
  : {article: Article, hub: string, height: Integer}) {
    return (
      <Box>
        <Link href={`/article-temp/${article.slug}`}>
          <Stack space={2}>
            <Box padding={2}>
              <img src={urlFor(article.imageRef)
                .width(350)
                .height(350)
                }/>
             </Box>
            <Heading size={1} margin={2} style={{maxWidth: "300px", margin: "0 auto"}}>
                {article.title}
              </Heading>
            </Stack>
          </Link>
      </Box>
    )
}
