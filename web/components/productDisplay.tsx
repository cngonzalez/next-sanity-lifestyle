import { Stack, Text } from '@sanity/ui'
import { urlFor } from '$sanityUtils'
import Link from 'next/link'

export function ProductDisplay({product, fullSize}: {product: any, fullSize: boolean}) {
  const maxWidth = (fullSize) ? '80%' : '18rem'
  const maxHeight = (fullSize) ? '25rem' : '20rem'

    return (
      <Stack>
        <img src={urlFor(product.image)
                    .width(500)
                    .height(500)
          } 
          style={{width: maxWidth, maxHeight: maxHeight, objectFit: "cover"}}/>
        <Text>
          {product.name}
          ${product.price}
        </Text>
      </Stack>
    )

}
