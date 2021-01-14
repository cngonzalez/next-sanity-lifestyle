import {
  Card,
  Container,
  Flex,
  Stack,
  Text,
} from '@sanity/ui'
import { GetStaticProps } from 'next'
import {Category} from '../types'
import client from '../client'
import { NavBar } from '$components'

function IndexPage({categories}: {categories: Category[]}) {
  return (
    <>
      <NavBar categories={categories} />
      <Card flex={1} paddingX={[3, 4, 5]} paddingY={[5, 6, 7, 8]}>
        <Stack space={[3, 4, 5]}>
          <Container width={0}>
            <Text muted size={[2, 3, 4]} style={{textAlign: 'center'}}>
              Coming soon!
            </Text>
          </Container>
        </Stack>
      </Card>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return ({
    props: {
      categories: await client.fetch(`*[_type == "category"]{name,'slug': slug.current}`)
    }
  })
}

export default IndexPage;
