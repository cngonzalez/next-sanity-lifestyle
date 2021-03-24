const bigCommerceHeaders = {
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-Auth-Token": process.env.BIGCOMMERCE_API_TOKEN,
  }
}

export default async function BigCommerceCart(req, res) {

  const { query: {cartID, itemID}, body } = req
  let bcCartResponse;

  try {
    if (req.method == 'POST') {
        bcCartResponse = await fetch(`${process.env.BIGCOMMERCE_API_URL}/carts`, {
             method: "POST",
             ...bigCommerceHeaders,
             body: JSON.stringify({line_items: []})
         })
         .then(response => response.json());
      
    }

    else if (req.method == 'GET') {
      if (!cartID || cartID == 'undefined' || cartID == 'null') {
        return res.status(400).json({error: 'Cart ID not found.'})
      }
       bcCartResponse = await fetch(`${process.env.BIGCOMMERCE_API_URL}/carts/${cartID}`, {
        ...bigCommerceHeaders
      })
     .then(response => response.json());
    }

    else if (req.method == 'PUT') {
      if (!cartID || cartID == 'undefined' || cartID == 'null') {
        return res.status(400).json({error: 'Cart ID not found.'})
      }

      bcCartResponse =  await fetch(`${process.env.BIGCOMMERCE_API_URL}/carts/${cartID}/items`, {
           method: 'POST',
           ...bigCommerceHeaders,
           body: JSON.stringify(body)
         })
      }

    else if (req.method == 'DELETE') {
      if (!cartID || cartID == 'undefined' || cartID == 'null') {
        return res.status(400).json({error: 'Cart ID not found.'})
      }

      bcCartResponse =  await fetch(`${process.env.BIGCOMMERCE_API_URL}/carts/${cartID}/items/${itemID}`, {
           method: 'DELETE',
           ...bigCommerceHeaders
         })
      }

    else {
      return res.status(400).json({error: 'Invalid request method -- check the code in the BigCommerce context provider.'})
    }
//
    //TODO: check status of bcCartResponse (400, etc.) and return meaningful message
    return res.status(200).json(bcCartResponse) 


  } catch (error) {
      console.log(error)
      return res.status(400).json({error: 'An error occurred. Please check your console log for more details.'})
  }

}
