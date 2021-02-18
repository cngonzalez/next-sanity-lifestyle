import {AppProps} from 'next/app'
import Head from 'next/head'
import React from 'react'
import {ThemeProvider, Box} from '@sanity/ui'
import {GlobalStyle} from '$components'
import {sanityTheme} from '$theme'

function App({Component, pageProps}: AppProps) {
  return (
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
    </ThemeProvider>
  )
}

export default App
