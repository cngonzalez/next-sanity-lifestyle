import {AppProps} from 'next/app'
import Head from 'next/head'
import React from 'react'

import { BigCommerceContextProvider } from '../contexts/bigcommerce-context'
import {sanityTheme} from '$theme'
import {ThemeProvider, Box} from '@sanity/ui'
import {GlobalStyle, Cart} from '$components'

function App({Component, pageProps, router}: AppProps) {

  return (
    <BigCommerceContextProvider>
      <ThemeProvider theme={sanityTheme}>
        <GlobalStyle />
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
          </Head>
        <Box>
          <Component {...pageProps} />
        </Box>
        <Cart />
      </ThemeProvider>
    </BigCommerceContextProvider>
  )
}

export default App
