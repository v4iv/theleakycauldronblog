import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const SE0 = (props) => {
  const { title, metaTitle, metaDescription, cover, slug, date, author, siteTitleAlt, siteTitle, siteUrl, siteFBAppID, userTwitter, pathPrefix } = props
  const postURL = siteUrl + slug
  const realPrefix = pathPrefix === '/' ? '' : pathPrefix
  const image = siteUrl + realPrefix + cover

  const breadcrumbSchemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': siteUrl,
          name: 'Home',
          image: siteUrl + '/icons/icon-512x512.png',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@id': postURL,
          name: title,
          image,
        },
      },
    ],
  }

  const blogPostingSchemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    url: postURL,
    name: title,
    alternateName: siteTitleAlt || '',
    headline: title,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postURL,
    },
    author: {
      '@type': 'Person',
      name: author,
    },
    image: {
      '@type': 'ImageObject',
      url: image,
    },
    datePublished: date,
    dateModified: date,
    publisher: {
      '@type': 'Organization',
      name: siteTitle,
      logo: {
        '@type': 'ImageObject',
        url: siteUrl + '/icons/icon-512x512.png',
      },
    },
    description: metaDescription,
  }

  return <Helmet>
    <title>{metaTitle}</title>

    {/* General tags */}
    <meta name='description' content={metaDescription} />

    <meta name='image' content={cover} />

    <link rel='canonical' href={postURL} />

    {/* Schema.org tags */}
    <script type='application/ld+json'>
      {JSON.stringify(breadcrumbSchemaOrgJSONLD)}
    </script>

    <script type='application/ld+json'>
      {JSON.stringify(blogPostingSchemaOrgJSONLD)}
    </script>

    {/* OpenGraph tags */}
    <meta property='og:url' content={postURL} />

    <meta property='og:title' content={title} />

    <meta property='og:author' content={author} />

    <meta property='og:description' content={metaDescription} />

    <meta property='og:image' content={image} />

    <meta
      property='fb:app_id'
      content={siteFBAppID || ''}
    />

    {/* Twitter Card tags */}
    <meta name='twitter:card' content='summary_large_image' />

    <meta name='twitter:site' content={postURL} />

    <meta name='twitter:creator' content={`@${userTwitter}` || ''} />

    <meta name='twitter:title' content={title} />

    <meta name='twitter:description' content={metaDescription} />

    <meta name='twitter:image' content={image} />
  </Helmet>
}

SE0.propTypes = {
  title: PropTypes.string,
  metaTitle: PropTypes.string,
  metaDescription: PropTypes.string,
  cover: PropTypes.node,
  slug: PropTypes.string,
  date: PropTypes.string,
  author: PropTypes.string,
  siteTitleAlt: PropTypes.string,
  siteTitle: PropTypes.string,
  siteUrl: PropTypes.string,
  siteFBAppID: PropTypes.string,
  userTwitter: PropTypes.string,
  pathPrefix: PropTypes.string,
}

export default SE0
