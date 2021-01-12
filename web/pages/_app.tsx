import {AppProps} from 'next/app'
import Head from 'next/head'
import React from 'react'
import {AppLayout} from '$components'
import {ThemeProvider} from '@sanity/ui'
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

      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ThemeProvider>
  )
}

export default App
