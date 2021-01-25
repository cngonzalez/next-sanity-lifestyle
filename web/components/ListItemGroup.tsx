import {Heading, Stack, Box, Flex } from '@sanity/ui'
import { ListItem } from '../types'
import { ListItemCard } from '$components'

export function ListItemGroup({listItems}: {listItems: ListItems[]}) {

  let listItemRows = []
  
  if (listItems.length > 3) {
    for (let i=0,len=listItems.length; i<len; i+=3){
      listItemRows.push(listItems.slice(i,i+3));
    }
  } else { 
    listItemRows = [listItems] 
  }

  const listItemDisplay = listItemRows.map(row => (
    <Flex>
      { row.map(item => <ListItemCard item={item} />) }
    </Flex>
  ))

  return (
    <Box> 
      { listItemDisplay }
    </Box> 
  )

}
