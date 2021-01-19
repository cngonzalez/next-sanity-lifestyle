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

  return (
      <Card borderBottom paddingTop={5} paddingBottom={1} style={{textAlign: 'center'}}>
        <Stack space={5}>
          <Link href="/">
            <Heading size={[2, 3, 4, 5]}>
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

