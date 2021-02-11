import { Flex, Stack, Grid, Text, Box } from '@sanity/ui'
import { ProductDisplay } from '$components'
import { urlFor, PortableText } from '$sanityUtils'
import Link from 'next/link'
import { Product } from '../types'

export function ProductsDisplay({products, fullSize, copy}
  : {products: Product[], fullSize: boolean, copy: any[] | any}) {
  let displayHorizontal;
  let productDisplays;

  //meaning the user has indicated they want the products to be in a row across the body of the text
  if (fullSize) {

  //if there's only one product, put its info beside it to fill up space
    displayHorizontal = (products.length == 1)

    productDisplays = products.map((product, i) => (
      <ProductDisplay
        key={i}
        product={product}
        displayHorizontal={displayHorizontal} />))

    if (products.length < 4) {
      return ( <Flex wrap='wrap' justify='center'>{productDisplays}</Flex> )

    //if there are 4 items return a grid
    } else {
      return ( <Grid>{productDisplays.slice(0, 4)}</Grid> )
    }
  } 


  //meaning the user has indicated they want the products to be to the side of the text
  else {
  //if there's multiple products, put its info beside it to avoid filling vertical space
    displayHorizontal = (products.length > 1)
    productDisplays = products.map((product, i) => (
      <ProductDisplay
        key={i}
        product={product}
        displayHorizontal={displayHorizontal} />))

    const finalDisplay = <Stack>{productDisplays.slice(0,3)}</Stack>

    //last check in case of user error -- don't make empty space of 65% if there's no copy!
    if (copy && typeof(copy) != 'undefined') {
      return (
        <Flex wrap='wrap' align='center'>
          <Box style={{minWidth: '150px', maxWidth: '500px'}} padding={2}>
            <PortableText blocks={copy}/>
          </Box>
          <Box>{finalDisplay}</Box>
        </Flex>
      )
    } else {
      return ( finalDisplay )
    }
  }
}
