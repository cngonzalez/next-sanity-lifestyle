import {Heading, Stack, Box, Grid, Card} from '@sanity/ui'
import { ListItem } from '../types'
import { ListItemCard } from '$components'

export function ListItemGroup({listItems}: {listItems: ListItems[]}) {
  const cols = (listItems.length >= 4) ? 4 : listItems.length
  return (
    <Box> 
      <Grid columns={[1,1,cols]}>
        { listItems.map((item, j) => (
            <ListItemCard item={item} key={j} groupParent />))
        }
      </Grid>
    </Box> 
  )

}
