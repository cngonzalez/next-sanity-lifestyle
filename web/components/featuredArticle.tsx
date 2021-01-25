import {Heading, Stack, Box, Flex} from '@sanity/ui'
import {Article} from '../types'
import Link from 'next/link'
import BlockContent from '@sanity/block-content-to-react'
import { urlFor } from '$sanityUtils'

export function FeaturedArticle({article, hub}
  : {article: Article, hub: string}) {

    return  (
      <Flex style={{maxHeight: "60vh"}}>
        <Box flex={1} >
            <Heading size={3} margin={2}
              style={{textAlign: "center", marginTop: "30%", width: "100%"}}>
              {article.title}
            </Heading>
          </Box>
        <Box flex={1} style={{objectFit: "contain"}}>
          <img style={{height: '100%', width: '100%'}}
            src={urlFor(article.imageRef) 
            }/>
        </Box>
        </Flex>
    )
  }
