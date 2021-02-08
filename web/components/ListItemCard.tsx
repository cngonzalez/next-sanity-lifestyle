import { Heading, Text, Card} from '@sanity/ui'
import { ListItem } from '../types'
import { ProductDisplay } from '$components'
import { urlFor, PortableText } from '$sanityUtils'

export function ListItemCard({item, groupParent}
           : {item: ListItem, groupParent: boolean}) {

  const productDisplays = []
  if (item.products) {
    item.products.forEach((product, i) => {
      const fullSize = !groupParent && item.orientation=='horizontal'
      productDisplays.push(<ProductDisplay product={product} fullSize={fullSize} key={i}/>)
    })
  }
  
  //if groupParent == true, products are column below text
  //if product display is large and no group parent, products are row below text
  //if product display is small and no group parent, products are column next to text
  return (
    <Card>
      <Heading size={2}>{item.title}</Heading>
      <Text>
        <PortableText blocks={item.text} />
        { productDisplays}
      </Text>
    </Card>)
}
