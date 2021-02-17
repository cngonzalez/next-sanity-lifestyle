import React from 'react'
import client from 'part:@sanity/base/client'

export function articlePreview({document: {displayed: { slug = {}, _type = "" } } }, categorySlug, subsectionSlug) {
  return (
      <iframe
      src={`http://localhost:3000/${categorySlug}/${subsectionSlug}/${slug.current}?preview`}
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
  )
}

export function productPreview({document: {displayed: { slug = {}, _type = "" } } }) {
  return (
      <iframe
      src={`http://localhost:3000/shop/${slug.current}?preview`}
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
  )
}

export function categoryPreview({document: {displayed: { slug = {}, _type = "" } } }) {
  return (
      <iframe
      src={`http://localhost:3000/${slug.current}?preview`}
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
  )
}
