const fetch = require('node-fetch')

const storeHash = process.env.SANITY_STUDIO_BIGCOMMERCE_STORE_HASH


const getToken = async () => (
  fetch(`https://api.bigcommerce.com/stores/${storeHash}/v3/storefront/api-token`, {
        method: 'POST',
        mode: 'cors',
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
    .then(res => (res.data.token))
)


const main = async () => {
  const token = await getToken()

}

main()
