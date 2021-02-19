import {Heading, Stack, Box, Flex, Text, Button} from '@sanity/ui'
import {Article} from '../types'
import Link from 'next/link'
import { urlFor } from '$sanityUtils'
import { excerptBlockText } from '../utils/helpers'

export function TextUnderFeature({title, text, imageRef, url}
  : {title: string, text: string, imageRef: string, url: string}) {

    return  (
      <Stack>
          <Box flex={1} style={{ minWidth: '350px', maxHeight: "400px"}}>  
            <img style={{height: '100%', width: '100%', objectFit: "cover"}}
              src={urlFor(imageRef) 
              }/>
          </Box>
          <Box paddingY={[2,3]}>
            <Flex>
              <Box flex={2}>
                <Heading size={3}>
                    {title}
                </Heading>
                <Box paddingTop={4}>
                  <Text>
                      { text }
                  </Text> 
                </Box>
              </Box>
              <Flex flex={1} justify='center' direction='column'>
                { url ? 
                ( <Link href={url}>
                    <Button
                      fontSize={[2, 2, 3]}
                      mode="ghost"
                      text="Read more"
                      style={{maxWidth: '200px', margin: '0 auto'}}
                    />
                  </Link> ) : <></>
                }
              </Flex>
            </Flex>
          </Box>
        </Stack>
    )
  }
