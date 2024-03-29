import React from 'react'

import {useSiteMetadata} from '@/hooks/useSiteMetadata'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  author?: string
  pathname?: string
  children?: React.ReactNode
}

function SEO({
  title,
  description,
  author,
  pathname,
  image,
  children,
}: SEOProps) {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image: defaultImage,
    siteUrl,
    social: {twitter},
  } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname || ``}`,
    author: author || ``,
    twitter,
  }

  return (
    <>
      {/* General tags */}
      <title>{seo.title}</title>

      <meta name="description" content={seo.description} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={seo.url} />

      <meta property="og:title" content={seo.title} />

      <meta property="og:author" content={seo.author} />

      <meta property="og:description" content={seo.description} />

      <meta property="og:image" content={seo.image} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:site" content={seo.url} />

      <meta name="twitter:creator" content={seo.twitter || ''} />

      <meta name="twitter:title" content={seo.title} />

      <meta name="twitter:description" content={seo.description} />

      <meta name="twitter:image" content={seo.image} />

      {children}
    </>
  )
}

export default SEO
