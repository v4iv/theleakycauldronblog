import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { HTMLContent } from '../components/Content'
import ArticleTemplate from '../components/ArticleTemplate'
import SE0 from '../components/SEO'
import Disqus from '../components/Disqus'
import Share from '../components/Share'
import 'prismjs/themes/prism-tomorrow.css'
import Layout from '../components/Layout'

const ArticlePage = ({ data }) => {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <section className='mw8 center'>
        <SE0
          title={post.frontmatter.title}
          meta_title={post.frontmatter.meta_title}
          meta_desc={post.frontmatter.meta_description}
          cover={post.frontmatter.cover}
          slug={post.fields.slug}
          date={post.frontmatter.date}
        />
        <ArticleTemplate
          content={post.html}
          contentComponent={HTMLContent}
          date={post.frontmatter.date}
          cover={post.frontmatter.cover}
          tags={post.frontmatter.tags}
          title={post.frontmatter.title}
        />
        <Share title={post.frontmatter.title} slug={post.fields.slug} excerpt={post.frontmatter.meta_description} />
        <Disqus title={post.frontmatter.title} slug={post.fields.slug} />
      </section>
    </Layout>
  )
}

ArticlePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ArticlePage

export const pageQuery = graphql`
  query ArticleByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        cover {
            childImageSharp {
                fluid(maxWidth: 1075, quality: 72) {
                    ...GatsbyImageSharpFluid
                }
            }
            publicURL
        }
        meta_title
        meta_description
        tags
      }
    }
  }
`
