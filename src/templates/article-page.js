import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import config from '../../config'
import { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'
import SE0 from '../components/SEO'
import ArticleTemplate from '../components/ArticleTemplate'
import Share from '../components/Share'
import CommentBox from '../components/CommentBox'

const ArticlePage = (props) => {
  const { data: { markdownRemark: { id, html, fields: { slug }, frontmatter: { title, metaTitle, metaDescription, cover, date, author, authorLink, tags } } } } = props

  return (
    <Layout>
      <SE0
        title={title}
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        cover={cover.publicURL}
        slug={slug}
        date={date}
        author={author}
        siteTitleAlt={config.siteTitleAlt}
        siteTitle={config.siteTitle}
        siteUrl={config.siteUrl}
        siteFBAppID={config.siteFBAppID}
        userTwitter={config.userTwitter}
        pathPrefix={config.pathPrefix}
      />

      <section className='center'>
        <ArticleTemplate
          content={html}
          contentComponent={HTMLContent}
          date={date}
          cover={cover}
          tags={tags}
          title={title}
          author={author}
          authorLink={authorLink}
        />

        <section className='mw8 center'>
          <Share title={title} slug={slug} excerpt={metaDescription} siteURL={config.siteUrl} pathPrefix={config.pathPrefix} />

          <CommentBox id={id} title={title} siteURL={config.siteUrl} slug={slug} pathPrefix={config.pathPrefix}/>
        </section>
      </section>
    </Layout>
  )
}

ArticlePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      id: PropTypes.string,
      html: PropTypes.any,
      fields: PropTypes.shape({
        slug: PropTypes.string,
      }),
      frontmatter: PropTypes.shape({
        date: PropTypes.string,
        title: PropTypes.string,
        author: PropTypes.string,
        authorLink: PropTypes.string,
        cover: PropTypes.object,
        metaTitle: PropTypes.string,
        metaDescription: PropTypes.string,
        tags: PropTypes.array,
      }),
    }),
  }),
}

export default ArticlePage

export const articlePageQuery = graphql`query ArticlePage($id: String!) {
  markdownRemark(id: {eq: $id}) {
    id
    html
    fields {
      slug
    }
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      title
      author
      authorLink
      cover {
        childImageSharp {
          gatsbyImageData(
              quality: 72, 
              placeholder: BLURRED,  
              layout: FULL_WIDTH
          )
        }
        publicURL
      }
      metaTitle
      metaDescription
      tags
    }
  }
}
`
