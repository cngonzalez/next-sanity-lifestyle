import { Grid, Box } from '@sanity/ui'
import { Article } from '../types'
import { urlFor } from '$utils/sanity'

export function IndexArticleGrid({articles}: {articles: Article[]}) {

  return (

    <Grid columns={[1, 1, 3]} rows={[3, 3, 2]} style={{maxHeight: '600px'}}>

      <Box columnStart={1} columnEnd={[1, 1, 3]} rowStart={1} rowEnd={[1,1,3]}>
        <img src={urlFor(articles[0].imageRef) } 
          style={{width: "100%", height: "100%", objectFit: "cover"}}/>
      </Box>  
      { articles[1] && (

      <Box columnStart={[1,1,3]} columnEnd={[1, 1, 3]} rowStart={[2,2,1]} rowEnd={2}>
        <img src={urlFor(articles[1].imageRef) } 
          style={{width: "100%", height: "100%", objectFit: "cover"}}/>
      </Box>) 
      }

    </Grid> 

  )

}
