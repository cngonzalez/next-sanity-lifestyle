import {Button, Card, Stack, Inline, Heading} from '@sanity/ui'
import {Category} from '../types'
import Link from 'next/link'

export function NavBar({categories, selectedCategoryName}
    : {categories: Category[], selectedCategoryName?: String}) {

  const navButtons = categories.map((category, i) => (
    //TODO: use MenuButton and Menu to cover subcategories
    <Link href={`/${category.slug }`} key={i}>
      <Button mode="bleed" padding={2} text={category.name} />
    </Link>
  ))
  navButtons.unshift(
        <Link href='/shop' key='shop'>
          <Button mode='bleed' tone='positive' padding={2} text='Shop' />
        </Link>
  )

  return (
      <Card borderBottom paddingTop={4} paddingBottom={1} style={{textAlign: 'center'}}>
        <Stack space={4}>
          <Link href="/">
            <Heading size={[2, 3, 4]}>
              <span style={{fontWeight: 'lighter'}}>Life</span>styled.
            </Heading>
          </Link>
        <Inline space={[4,4,5]} style={{textAlign: 'center'}}>
          { navButtons }
        </Inline>
        </Stack>
      </Card>
  )
}

