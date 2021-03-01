const fetch = require('node-fetch')
import Schema from '@sanity/schema'
import blockTools from '@sanity/block-tools'
const sanityClient = require('@sanity/client')
const jsdom = require('jsdom')
const {JSDOM} = jsdom

const storeHash = process.env.SANITY_STUDIO_BIGCOMMERCE_STORE_HASH
const storeUrl = process.env.SANITY_STUDIO_BIGCOMMERCE_STOREFRONT_API_URL
const pageSize = 100
let cursorStr = ""

const client = sanityClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  token: process.env.SANITY_STUDIO_API_TOKEN,
  useCdn: false 
})

const slugify = (input) => input
                         .toLowerCase()
                         .replace(/\s+/g, '-')
                         .slice(0, 200)

const miniProductSchema = Schema.compile({
  name: 'site',
  types: [
    {type: 'object',
     name: 'product',
     fields: [
      {
        title: 'Description',
        name: 'description',
        type: 'array',
        of: [{type: 'block'}]
      }
    ]}
  ]
})

const blockContentType = miniProductSchema.get('product')
  .fields.find(field => field.name === 'description').type

const paginatedProductQuery = `
  query paginateProducts(
    $pageSize: Int = ${pageSize}
    $cursor: String ${cursorStr || ""}
  ) {
    site {
      products (first: $pageSize, after:$cursor) {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            entityId 
            name
            sku
            description
            prices {
              price {
                currencyCode
                value
              }
            }
            defaultImage {
              urlOriginal
            }
            brand {
              name
            }
          }
        }
      }
    }
  }
`

//may be useful to have these methods  available in next as well since it will likely be used there
const getToken = async () => (
  fetch(`https://api.bigcommerce.com/stores/${storeHash}/v3/storefront/api-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': process.env.SANITY_STUDIO_BIGCOMMERCE_STORE_API_TOKEN
        },
        body: JSON.stringify({
          channel_id: 1,
          expires_at: Math.floor((Date.now() / 1000)) + 3600,
          allowed_cors_origins: ["http://localhost:3333"]
        })
    })
    .then(res => res.json())
    .then(res => res.data.token)
)


const getProducts = async (token) => (
  fetch(`${storeUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      query: paginatedProductQuery
    })
  })
    .then(res => res.json())
    .then(res => res.data)
)

const reshapeNode = ({node}) => {
  return (
    {  
      _id: `imported-BC-${node.entityId}`,
      _type: 'product',
      name: node.name,
      slug: slugify(node.name),
      sku: node.sku,
      description: blockTools.htmlToBlocks(
        node.description || "",
        blockContentType,
        {parseHtml: (html) => new JSDOM(html).window.document}
      ),
      price: node.prices?.price?.value,
      manufacturer: node.brand?.name,
      productImage: {
        _type: 'image',
        _sanityAsset: `image@${node.defaultImage?.urlOriginal}`
      }
    })
}


const main = async () => {
  const token = await getToken()
  let {site: {products: {pageInfo, edges}}} = await getProducts(token)
  // while (edges) {
    cursorStr = `= ${pageInfo.endCursor}`
    const transformed = edges.map(reshapeNode)
    let transaction = client.transaction()
    transformed.forEach(document => {
      transaction.createOrReplace(document)
    })

    return transaction.commit()
    
    //conform each node to the format sanity wants
    //upload 
    //load new products
  // }
}

main()
