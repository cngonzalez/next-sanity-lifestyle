import {Heading, Stack, Box } from '@sanity/ui'
import {ArticleExcerpt} from '../types'
import Link from 'next/link'
import BlockContent from '@sanity/block-content-to-react'
import { urlFor } from '$sanityUtils'

export function ArticlePane({article, hub, height}
  : {article: ArticleExcerpt, hub: string, height: Integer}) {
    return (
      <Box>
        <Link href={`/article-temp/${article.slug}`}>
          <Stack space={2}>
            <Box padding={2}>
              <img src={urlFor(article.imageRef)
                .width(450)
                .height(height)
                }/>
             </Box>
              <Heading size={1} margin={2}>
                {article.title}
              </Heading>
            </Stack>
          </Link>
      </Box>
    )
}
