import { Flex, Stack, Grid, Text, Box } from '@sanity/ui'
import { ProductDisplay } from '$components'
import { urlFor, PortableText } from '$sanityUtils'
import Link from 'next/link'
import { Product } from '../types'

export function ProductsDisplay({products, fullSize, copy}
  : {products: Product[], fullSize: boolean, copy: any[] | any}) {
  let displayHorizontal;
  let productDisplays;

  if (fullSize) {

    //if there's only one product and products are on their own row,
    //put its info beside it to fill up space
    displayHorizontal = (products.length == 1)

    productDisplays = products.map((product, i) => (
      <ProductDisplay
        key={i}
        product={product}
        displayHorizontal={displayHorizontal}
        shopNow />))


    //row or grid
    if (products.length < 4) {
      return ( <Flex wrap='wrap' justify='center'>{productDisplays}</Flex> )
    } else {
      return ( <Grid>{productDisplays.slice(0, 4)}</Grid> )
    }
  } 


  //products not on own row
  else {
  //if there's multiple products, put its info beside it to avoid filling vertical space
    displayHorizontal = (products.length > 1)
    productDisplays = products.map((product, i) => (
      <ProductDisplay
        key={i}
        product={product}
        displayHorizontal={displayHorizontal}
        shopNow />))

    const finalDisplay = <Stack>{productDisplays.slice(0,3)}</Stack>

    //last check in case of user error -- don't make empty space of 65% if there's no copy!
    if (copy && typeof(copy) != 'undefined') {
      return (
        <Flex wrap='wrap' align='center'>
          <Box flex={2} paddingX={2}>
            <Text>
              <PortableText blocks={copy}/>
            </Text>
          </Box>
          <Box flex={1}>{finalDisplay}</Box>
        </Flex>
      )
    } else {
      return ( finalDisplay )
    }
  }
}
