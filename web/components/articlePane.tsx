import {Heading, Stack, Box, Text} from '@sanity/ui'
import {ArticleExcerpt} from '../types'
import Link from 'next/link'
import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'

function urlFor (source) {
  return imageUrlBuilder(client).image(source)
}

export function ArticlePane({article, hub}
  : {article: ArticleExcerpt, hub: string}) {
    //temp fix, be more rigorous here
    const excerpt = article.content[0].children[0].text.split(" ").slice(0,10).join(" ")
    return (
        <Link href={`/article-temp/${article.slug}`}>
          <Stack space={2}>
            <Box padding={2}>
              <img src={urlFor(article.imageRef)
                .width(300)
                .height(300)
                }/>
             </Box>
              <Heading size={1}>
                {article.title}
              </Heading>
              <Text>
                { `${excerpt}...` }
              </Text>
            </Stack>
          </Link>
    )
}
