import { GetStaticProps, GetStaticPaths } from 'next'
import Error from 'next/error'
import { Product, Category } from '../../types'
import { getClient, urlFor, PortableText, usePreviewSubscription } from '$sanityUtils'
import { groq } from "next-sanity"
import { NavBar, SubsectionBar } from '$components'
import { Stack, Inline, Button, Box, Heading, Text, Badge, Flex } from '@sanity/ui'
import { useRouter } from 'next/router'

  const campaignQuery = groq`
    *[_type == 'campaign' && slug.current == $slug][0]
    {
     'slug': slug.current,
     'image': productImage.asset._ref,
      title,
      content,
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

  return (
    <>
      <NavBar categories={categories} />
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
