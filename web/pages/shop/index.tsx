import { Box, Grid, Heading, Stack } from '@sanity/ui'
import { GetStaticPaths, GetStaticProps } from 'next'
import { sanityClient } from '$sanityUtils'
import { Category, CategoryProducts } from '../../types'
import { NavBar, ProductDisplay } from '$components'

export default function Shop({categories, categoryProducts}
  : {categories: Category[], categoryProducts: CategoryProducts[]}) {

    const categoryGrids = categoryProducts.map((cat,i) => (
      <Box key={i} padding={2} margin={5}>
        <Heading className='hubHeader'>
          <span>{cat.name}</span>
        </Heading>
        <Grid columns={2} padding={2} margin={5}>
          { cat.products.map((prod, j) => (<ProductDisplay key={j} product={prod} />)) }
        </Grid>
      </Box>
    ))

    //TODO: promotion/campaign up top
    return (
      <>
        <NavBar categories={categories} />
        <Box> 
          { categoryGrids }
        </Box>
      </> 
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  //TODO: snip and have subpages instead.
  //maybe even serve this client side and paginate

  const productsByCategory = await sanityClient.fetch(`
    *[_type == 'category']{
      name,
      'products': *[_type == 'product'
        && references(^._id)]{
          'slug': slug.current,
          'image': productImage.asset._ref,
          name,
          description,
          price,
          manufacturer
        }
    }`)

  return ({
    props: {
      categories: await sanityClient.fetch(`*[_type == 'category']{name,'slug': slug.current}`),
      categoryProducts: productsByCategory.filter(cat => cat.products.length)
    }
  })

}
