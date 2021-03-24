import React from 'react'
import { Dialog, Box, Text } from '@sanity/ui'

import { useStore, useToggleCart } from '../contexts/bigcommerce-context'
import { CartProductDisplay } from '$components'

export const Cart = () => {
  const { isCartOpen, cart } = useStore()
  const toggleCart = useToggleCart()
  let cartDisplay;

  const products = cart.line_items.map((product, i) => (
      <CartProductDisplay
        key={`cart-${i}`}
        product={product}
        displayHorizontal={true}
        width={100}
        shopNow={false} />
  ))

  if (isCartOpen) {
    cartDisplay = (
      <Dialog
        header='Your cart'
        id='cart'
        onClose={toggleCart}
        zOffset={1000}>
          <Box padding={4}>
            { products } 
          </Box>
      </Dialog>
    )
  } else {
    cartDisplay = <span />
  }

  return  (
    <React.Fragment>
      {cartDisplay}
    </React.Fragment>  
    )
}
