import { Box, Grid, Heading } from '@sanity/ui'
import { GetStaticPaths, GetStaticProps } from 'next'
import { sanityClient } from '$utils/sanity'
import { Category, CategoryProducts } from '../../types'
import { NavBar, ShopGrid } from '$components'

export default function Shop({categories, categoryProducts}
  : {categories: Category[], categoryProducts: CategoryProducts[]}) {

    const categoryGrids = categoryProducts.map((cat,i) => (
      <ShopGrid key={i} sectionTitle={cat.name} products={cat.products} />)
    )

    //TODO: promotion/campaign up top
    return (
      <>
        <NavBar categories={categories} />
        <Box paddingY={3}> 
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
