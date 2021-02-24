import {Heading, Box, Flex, Text, Button} from '@sanity/ui'
import { Color } from '../types'
import Link from 'next/link'
import { urlFor, PortableText } from '$sanityUtils'
import { excerptBlockText } from '../utils/helpers'

export function SolidBlockFeature(
  {title, text, image, url, orientation, textColor, blockColor}
    : {title: string, text: any | any[], image: string, url: string, orientation: string,
      textColor: Color, blockColor: Color}) {

    const solidBlockStyle = { textAlign: "center",
                              backgroundColor: (blockColor ? blockColor.hex :"#32021f"),
                              color: (textColor ? textColor.hex : 'white'),
                              minWidth: '350px' }

    const solidBlock = (
        <Flex flex={1} justify='center' direction='column'
          style={solidBlockStyle}>

          <Heading size={3} style={{width: '100%'}}>
            { title }
          </Heading>

          <Text style={{maxWidth: "60%", padding: "3rem", margin: "0 auto"}}>
            <PortableText blocks={text} />
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
    )

    const imageBlock =  (
        <Box flex={1} style={{ minWidth: '350px', minHeight: '350px', maxHeight: "500px"}}>  
          <img style={{height: '100%', width: '100%', objectFit: "cover"}}
               src={urlFor(image)}/>
        </Box>
    )

    let content;

    if (orientation == 'right') {
      content = [imageBlock, solidBlock]
    } else {
      content = [solidBlock, imageBlock]
    }

    return  (
      <Flex wrap="wrap" style={{maxHeight: "500px"}} padding={1}>
        { content }
      </Flex>
    )
  }
