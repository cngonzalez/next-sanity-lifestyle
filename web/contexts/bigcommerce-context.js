import React, { createContext, useContext, useEffect, useState } from 'react'

const initialStoreState = {
  isCartOpen: false,
  isUpdating: false,
  checkout: {
    id: null,
    lineItems: []
  }
}


const BigCommerceContext = createContext({
  store: initialStoreState,
  setStore: () => null
})

/* ------------------ */
/* Context Wrapper    */
/* ------------------ */
const BigCommerceContextProvider = ({ children }) => {
  const [store, setStore] = useState(initialStoreState)
  const [initStore, setInitStore] = useState(false)

  useEffect(() => {
    // Shopify checkout not build yet
    if (initStore === false) {
      // const initializeCheckout = async () => {
      //   const existingCheckoutID =
      //     typeof window !== 'undefined'
      //       ? localStorage.getItem(SHOPIFY_CHECKOUT_ID)
      //       : false

        // existing Shopify checkout ID found
        // if (existingCheckoutID) {
        //   try {
        //     // fetch checkout from Shopify
        //     const existingCheckout = await fetchCheckout(
        //       store,
        //       existingCheckoutID
        //     )

        //     // Check if there are invalid items
        //     if (
        //       existingCheckout.lineItems.some((lineItem) => !lineItem.variant)
        //     ) {
        //       throw new Error(
        //         'Invalid item in checkout. This variant was probably deleted from Shopify.'
        //       )
        //     }

        //     // Make sure this cart hasn’t already been purchased.
        //     if (!existingCheckout.completedAt) {
        //       setCheckoutState(existingCheckout, setStore)
        //       return
        //     }
        //   } catch (e) {
        //     localStorage.setItem(SHOPIFY_CHECKOUT_ID, null)
        //   }
        // }

        // Otherwise, create a new checkout!
        // const newCheckout = await createNewCheckout(store)
        // setCheckoutState(newCheckout, setStore)
      // }

      // Initialize the store context
      // initializeCheckout()
      setInitStore(true)
    }
  }, [initStore, store, setStore])

  return (
    <BigCommerceContext.Provider
      value={{
        store,
        setStore
      }}>
      {children}
    </BigCommerceContext.Provider>
  )
}


/* ------------------ */
/* Context Helpers    */
/* ------------------ */
function useStore() {
  const { store } = useContext(BigCommerceContext)
  return store
}


function useToggleCart() {
  const {
    store: { isCartOpen },
    setStore,
  } = useContext(BigCommerceContext)

  async function toggleCart() {
    setStore((prevState) => {
      return { ...prevState, isCartOpen: !isCartOpen }
    })
  }
  return toggleCart
}


export {
  BigCommerceContextProvider,
  useStore,
  useToggleCart
}
