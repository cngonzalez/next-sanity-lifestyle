import { Box, Grid, Heading } from '@sanity/ui'
import { Product } from '../types'
import { ProductDisplay } from '$components'


export function ShopGrid({sectionTitle, products}
  : {sectionTitle: string, products: Product[]}) {

    return (
      <Box paddingTop={4} margin={[0,0,1,2]}>
        <Heading className='hubHeader'>
          <span>{sectionTitle}</span>
        </Heading>
        <Grid columns={[1, 1, 3]}  padding={[0, 0, 2]} margin={5}>
          { products.map((prod, j) => (
            <ProductDisplay 
              key={j}
              product={prod}
              displayHorizontal={false}
              shopNow={false} 
              width={200} />)) }
        </Grid>
      </Box>
    )
}
