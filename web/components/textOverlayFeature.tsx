import {Heading, Box, Flex, Text, Button} from '@sanity/ui'
import {Article} from '../types'
import Link from 'next/link'
import { urlFor, PortableText } from '$sanityUtils'
import { excerptBlockText } from '../utils/helpers'
import styled from 'styled-components'


export function TextOverlayFeature({title, text, image, url}
  : {title: string, text: any | any[], image: string, url: string}) {

  const OverlayBox = styled.div`
    background: 
      linear-gradient(
        rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.4)
      ),
      url(${urlFor(image)});
      background-size: cover;
      height: 100%;
      width: 100%;
      position: relative;
    `
    const OverlayText = styled.div`
      color: white;
      position: absolute;
      top: 40%;
      left: 35%;
      transform: translate(-50%, -50%);
    `

    return  (
        <Box flex={1} style={{ minWidth: '350px', height: "400px"}}>  
          <OverlayBox>
            <OverlayText>
              <Heading size={3}>
                {title}
              </Heading>
              <Box paddingTop={4}>
                <Text>
                  <PortableText blocks={text} />
                </Text> 
              </Box>
              <Box paddingTop={4}>
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
              </Box>
            </OverlayText>
          </OverlayBox>
        </Box>
    )
  }
