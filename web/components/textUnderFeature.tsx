import {Heading, Stack, Box, Flex, Text, Button} from '@sanity/ui'
import {Article} from '../types'
import Link from 'next/link'
import { urlFor } from '$sanityUtils'
import { excerptBlockText } from '../utils/helpers'

export function TextUnderFeature({article}: {article: Article}) {

    return  (
      <Stack>
          <Box flex={1} style={{ minWidth: '350px', maxHeight: "400px"}}>  
            <img style={{height: '100%', width: '100%', objectFit: "cover"}}
              src={urlFor(article.imageRef) 
              }/>
          </Box>
          <Box paddingY={[2,3]}>
            <Flex>
              <Box flex={2}>
                <Heading size={3}>
                    {article.title}
                </Heading>
                <Box paddingTop={4}>
                  <Text>
                      { excerptBlockText(article.content[0], 20) }
                  </Text> 
                </Box>
              </Box>
              <Flex flex={1} justify='center' direction='column'>
                <Link href={`${article.category.slug}/${article.subsection.slug}/${article.slug}`}>
                  <Button
                    fontSize={[2, 2, 3]}
                    mode="ghost"
                    text="Read more"
                    style={{maxWidth: '200px', margin: '0 auto'}}
                  />
                </Link>
              </Flex>
            </Flex>
          </Box>
        </Stack>
    )
  }
