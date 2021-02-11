import {Heading, Stack, Box, Flex, Text, Button} from '@sanity/ui'
import {Article} from '../types'
import Link from 'next/link'
import { urlFor } from '$sanityUtils'
import { excerptBlockText } from '../utils/helpers'

export function FeaturedArticle({article}: {article: Article}) {

    return  (
      <Flex wrap="wrap" style={{maxHeight: "500px", backgroundColor: "#F8F8F8"}}>

        <Flex flex={1} margin={5} justify='center' direction='column'
          style={{ textAlign: "center",backgroundColor: "#F8F8F8",  minWidth: '350px' }}>
          <Heading size={3} style={{width: '100%'}}>
                {article.title}
              </Heading>
            <Text style={{maxWidth: "60%", padding: "3rem", margin: "0 auto"}}>
                { excerptBlockText(article.content[0], 12) }
              </Text> 
            <Link href={`${article.category.slug}/${article.subsection.slug}/${article.slug}`}>
              <Button
                fontSize={[2, 2, 3]}
                mode="ghost"
                text="Read more"
                style={{maxWidth: '200px', margin: '0 auto'}}
              />
            </Link>
          </Flex>
        
          <Box flex={1} style={{ minWidth: '350px', maxHeight: "60vh"}}>  
            <img style={{height: '100%', width: '100%', objectFit: "cover"}}
              src={urlFor(article.imageRef) 
              }/>
          </Box>

        </Flex>
    )
  }
