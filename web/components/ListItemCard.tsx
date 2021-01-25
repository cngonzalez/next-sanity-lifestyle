import { Heading, Card } from '@sanity/ui'
import { ListItem } from '../types'
import Link from 'next/link'
import BlockContent from '@sanity/block-content-to-react'
import { urlFor } from '$sanityUtils'

export function ListItemCard({item}: {item: ListItem}) {
  console.log(item)
  return (<Card/>)
}
