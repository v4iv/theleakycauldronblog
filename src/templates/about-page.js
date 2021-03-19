import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import config from '../../config'
import { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'
import AboutPageTemplate from '../components/AboutPageTemplate'

const AboutPage = (props) => {
  const { data: { markdownRemark: { html, frontmatter: { title, subtitle, author, metaTitle, metaDescription, image } } } } = props
  const breadcrumbSchemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': config.siteUrl,
          name: 'Home',
          image: config.siteUrl + '/icons/icon-512x512.png',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@id': config.siteUrl + '/about/',
          name: 'About',
          image: config.siteUrl + '/icons/icon-512x512.png',
        },
      },
    ],
  }

  const aboutPageSchemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'AboutPage',
    url: config.siteUrl + '/about/',
    headline: title,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': config.siteUrl + '/about/',
    },
    image: {
      '@type': 'ImageObject',
      url: image.publicURL,
      width: 3120,
      height: 1394,
    },
    publisher: {
      '@type': 'Organization',
      name: config.siteTitle,
      logo: {
        '@type': 'ImageObject',
        url: config.siteUrl + '/icons/icon-512x512.png',
        width: 512,
        height: 512,
      },
    },
    description: metaDescription,
  }

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>

        <meta name='description' content={metaDescription} />

        {/* Open Graph Tags */}
        <meta property='og:url' content={`${config.siteUrl}/about`} />

        <meta property='og:title' content={title} />

        <meta property='og:description' content={metaDescription} />

        <meta property='og:image' content={image} />

        {/* Schema.org tags */}
        <script type='application/ld+json'>
          {JSON.stringify(breadcrumbSchemaOrgJSONLD)}
        </script>

        <script type='application/ld+json'>
          {JSON.stringify(aboutPageSchemaOrgJSONLD)}
        </script>

        <link rel='canonical' href={`${config.siteUrl}/about`} />
      </Helmet>

      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={title}
        subtitle={subtitle}
        author={author}
        image={image}
        content={html}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.any,
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        subtitle: PropTypes.string,
        author: PropTypes.string,
        image: PropTypes.object,
        metaTitle: PropTypes.string,
        metaDescription: PropTypes.string,
      }),
    }),
  }),
}

export default AboutPage

export const aboutPageQuery = graphql`query AboutPage($id: String!) {
  markdownRemark(id: {eq: $id}) {
    html
    frontmatter {
      title
      subtitle
      author
      image {
        childImageSharp {
          gatsbyImageData(
              quality: 72, 
              placeholder: BLURRED, 
              width: 500, 
              layout: CONSTRAINED
          )
        }
        publicURL
      }
      metaTitle
      metaDescription
    }
  }
}
`
