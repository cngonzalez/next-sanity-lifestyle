import {Heading, Stack, Box, Grid, Card} from '@sanity/ui'
import { ListItem } from '../types'
import { ListItemCard } from '$components'

export function ListItemGroup({listItems}: {listItems: ListItems[]}) {

  return (
    <Box> 
      <Grid columns={2}>
        { listItems.map((item, j) => (
            <ListItemCard item={item} key={j} groupParent />))
        }
      </Grid>
    </Box> 
  )

}
