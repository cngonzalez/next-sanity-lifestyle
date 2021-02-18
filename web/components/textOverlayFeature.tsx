import {Heading, Box, Flex, Text, Button} from '@sanity/ui'
import {Article} from '../types'
import Link from 'next/link'
import { urlFor } from '$sanityUtils'
import { excerptBlockText } from '../utils/helpers'
import styled from 'styled-components'


export function TextOverlayFeature({article}: {article: Article}) {

  const OverlayBox = styled.div`
    background: 
      linear-gradient(
        rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.4)
      ),
      url(${urlFor(article.imageRef)});
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
                {article.title}
              </Heading>
              <Box paddingTop={4}>
                <Text>
                    { excerptBlockText(article.content[0], 20) }
                </Text> 
              </Box>
              <Box paddingTop={4}>
                <Link href={`${article.category.slug}/${article.subsection.slug}/${article.slug}`}>
                  <Button
                    fontSize={[2, 2, 3]}
                    mode="ghost"
                    text="Read more"
                    style={{maxWidth: '200px', margin: '0 auto'}}
                  />
                </Link>
              </Box>
            </OverlayText>
          </OverlayBox>
        </Box>
    )
  }
