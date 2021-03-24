import { GetStaticProps, GetStaticPaths } from 'next'
import Error from 'next/error'
import { Product, Category } from '../../types'
import { groq } from "next-sanity"
import { NavBar, ShopGrid, SolidBlockFeature } from '$components'
import { getClient, urlFor, PortableText, usePreviewSubscription } from '$utils/sanity'
import { handleBlockFeature } from '$helpers'
import { Stack, Box } from '@sanity/ui'
import { useRouter } from 'next/router'

  const campaignQuery = groq`
    *[_type == 'campaign' && slug.current == $slug][0]
    {
     'slug': slug.current,
     'image': heroImage.asset._ref,
      title,
      text,
      hideLeadBlock,
      content[]{
        ...,
        _type == 'productCardFeature'=>{
          products[]->{
            name, price, description, manufacturer,
            'slug': slug.current,
            'image': productImage.asset._ref
          }
        }
      },
      products[]->{
        'slug': slug.current,
        'image': productImage.asset._ref,
        name,
        description,
        price,
        manufacturer
      }
    }`

export default function CampaignPage({categories, campaignData, preview}
  : {categories: Category[], campaignData: Campaign, preview: boolean}) {

  const router = useRouter();
  if (!router.isFallback && !campaignData?.slug) {
    return <Error statusCode={404} />;
  }

  const {data: campaign} = usePreviewSubscription(campaignQuery, {
    params: {slug: campaignData.slug},
    initialData: campaignData,
    enabled: preview || router.query.preview !== null,
  })

  const parsedContent = campaign.content.map(({_type, ...block}, i) => (
    <Box key={i} padding={0}>
      { handleBlockFeature(_type, block, true) }
    </Box>
  ))

  const campaignFeatureProps = {
    ...campaign,
    blockColor: {hex: '#FFF'},
    textColor: {hex: '#000'},
    orientation: 'right'
  }

  return (
    <>
      <NavBar categories={categories} />
      <Stack>
        { (campaign.hideLeadBlock) ?  <span /> : <SolidBlockFeature {...campaignFeatureProps} /> }
        { parsedContent }
      </Stack>
      <ShopGrid sectionTitle="Shop the Campaign" products={campaign.products} />
    </>
    )
}
            
export const getStaticPaths: GetStaticPaths = async (context) => {
  const campaignSlugs = await getClient().fetch(
    `*[_type == "campaign"]{
      'slug': slug.current
    }`)

  const paths = {paths: campaignSlugs.map(
    (slugObj) => ({params: slugObj}))}
    
  return { ...paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({params, preview = false}) => {
  const campaign = await getClient(preview).fetch(campaignQuery, params)


  return ({
    props: {
      categories: await getClient(preview).fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      campaignData: campaign,
      preview
    }
  })
}
