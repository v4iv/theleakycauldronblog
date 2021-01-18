import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import ContactPageTemplate from '../components/ContactPageTemplate'
import Layout from '../components/Layout'
import config from '../../config'

const ContactPage = props => {
  const { data: { markdownRemark: { frontmatter: { title, subtitle, meta_title, meta_description } } } } = props

  return (
    <Layout>
      <Helmet>
        <title>{meta_title}</title>
        <meta name='description' content={meta_description} />
        {/* Open Graph Tags */}
        <meta property='og:url' content={`${config.siteUrl}/contact`} />

        <meta property='og:title' content={title} />

        <meta property='og:description' content={meta_description} />

        <link rel='canonical' href={`${config.siteUrl}/contact`} />
      </Helmet>

      <ContactPageTemplate
        title={title}
        subtitle={subtitle}
        meta_title={meta_title}
        meta_description={meta_description}
      />
    </Layout>
  )
}

ContactPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        subtitle: PropTypes.string,
        meta_title: PropTypes.string,
        meta_description: PropTypes.string,
      }),
    }),
  }),
}

export default ContactPage

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        subtitle
        meta_title
        meta_description
      }
    }
  }
`
