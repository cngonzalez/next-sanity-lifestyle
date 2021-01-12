import {Box, Button, Card, Container, Flex, Inline, Menu, MenuButton, MenuItem} from '@sanity/ui'
import React from 'react'
import {Category} from '../types'

export function AppLayout({children}: {children?: react.ReactNode}) {
  return (
    <>
      <Box>
        { children }
      </Box>
    </>
  )
}
