import { Stack, Flex, Text, Box } from '@sanity/ui'
import { urlFor } from '$sanityUtils'
import Link from 'next/link'

export function ProductDisplay({product, displayHorizontal, shopNow}
  : {product: any, displayHorizontal: boolean, shopNow: boolean}) {

  const imgBox = (
    <Box style={{width: '225px', margin: '0 auto'}}>
      <img style={{height: '225px',
        width: '100%',
        objectFit: 'cover',
        borderRadius: '50%'
        }}
      src={urlFor(product.image)} />
    </Box>
  )

  const productInfo = (
    <Box>
      <Text style={{textAlign: 'center'}}>

        <span style={{fontSize: '.9em'}}>
          {product.manufacturer}<br/>
        </span>

        <span style={{textTransform: 'uppercase', fontWeight: 'bold'}}>
          {product.name}<br/>
        </span>

        <span style={{fontSize: '.9em'}}>
          ${product.price}<br/>
        </span>

        <span style={{textTransform: 'uppercase', textDecoration: 'underline', fontSize: '.9em'}}>
          <Link href={`/shop/${product.slug}`}>
            { (shopNow) ? "Shop now" : "More..." }
          </Link> 
        </span>

      </Text>
    </Box>
  )

  if (displayHorizontal) {
    return (
      <Flex justify='space-between' style={{width: '100%'}}>
        { imgBox }
        { productInfo }
      </Flex>
    )
  } else {
    return (
      <Stack padding={1}>
        { imgBox }
        { productInfo }
      </Stack>
    )
  }
}
