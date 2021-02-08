import {Heading, Stack, Box, Card, Flex, Text, Button} from '@sanity/ui'
import {Article} from '../types'
import Link from 'next/link'
import { urlFor } from '$sanityUtils'
import { excerptBlockText } from '../utils/helpers'

export function FeaturedArticle({article, hub}
  : {article: Article, hub: string}) {

    return  (
      <Flex style={{maxHeight: "60vh", backgroundColor: "#F8F8F8"}}>

        <Card flex={1} margin={5} 
          style={{ textAlign: "center",backgroundColor: "#F8F8F8",
                  paddingTop: "6rem"}}>
            <Heading size={3} margin={5}>
                {article.title}
              </Heading>
            <Text style={{maxWidth: "60%", padding: "3rem", margin: "0 auto"}}>
                { excerptBlockText(article.content[0], 12) }
              </Text> 
            <Link href={`${hub}/${article.slug}`}>
              <Button
                fontSize={[2, 2, 3]}
                mode="ghost"
                text="Read more"
              />
            </Link>
          </Card>
        
          <Card flex={1}>  
            <img style={{height: '100%', width: '100%', objectFit: "cover"}}
              src={urlFor(article.imageRef) 
              }/>
          </Card>

        </Flex>
    )
  }
