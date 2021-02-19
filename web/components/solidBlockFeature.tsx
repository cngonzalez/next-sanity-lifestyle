import {Heading, Box, Flex, Text, Button} from '@sanity/ui'
import {Article} from '../types'
import Link from 'next/link'
import { urlFor } from '$sanityUtils'
import { excerptBlockText } from '../utils/helpers'

export function SolidBlockFeature(
  {title, text, imageRef, url}
  : {title: string, text: string, imageRef: string, url: string}) {

    return  (
      <Flex wrap="wrap" style={{maxHeight: "500px"}} padding={1}>

        <Flex flex={1} justify='center' direction='column'
          style={{ textAlign: "center", backgroundColor: "#32021f", color: 'white', minWidth: '350px' }}>

          <Heading size={3} style={{width: '100%'}}>
            { title }
          </Heading>

          <Text style={{maxWidth: "60%", padding: "3rem", margin: "0 auto"}}>
            { text }
          </Text>
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
        
        <Box flex={1} style={{ minWidth: '350px', minHeight: '350px', maxHeight: "500px"}}>  
          <img style={{height: '100%', width: '100%', objectFit: "cover"}}
               src={urlFor(imageRef)}/>
        </Box>

      </Flex>
    )
  }
