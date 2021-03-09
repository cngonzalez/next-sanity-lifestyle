import React from 'react'
import { useStore, useToggleCart } from '../contexts/bigcommerce-context'
import { Dialog, Box, Text } from '@sanity/ui'

export const Cart = () => {
  const { isCartOpen, isUpdating } = useStore()
  const toggleCart = useToggleCart()

  return (isCartOpen && (
    <Dialog
      header='Your cart'
      id='cart'
      onClose={toggleCart}
      zOffset={1000}>
        <Box padding={4}>
          <Text>Content</Text>
        </Box>
    </Dialog>
  ))
}
