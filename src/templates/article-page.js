import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Disqus } from 'gatsby-plugin-disqus'
import config from '../../config'
import { HTMLContent } from '../components/Content'
import ArticleTemplate from '../components/ArticleTemplate'
import SE0 from '../components/SEO'
import Share from '../components/Share'
import Layout from '../components/Layout'

const ArticlePage = (props) => {
  const { data: { markdownRemark: { id, html, fields: { slug }, frontmatter: { title, meta_title, meta_description, cover, date, author, author_link, tags } } } } = props

  return (
    <Layout>
      <SE0
        title={title}
        meta_title={meta_title}
        meta_desc={meta_description}
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
          author_link={author_link}
        />

        <section className='mw8 center'>
          <Share title={title} slug={slug} excerpt={meta_description} siteUrl={config.siteUrl} pathPrefix={config.pathPrefix} />

          <section className='mb3 pa3 pa5-l center' key={id}>
            <Disqus config={{
              url: `${config.siteUrl}/blog/${slug}`,
              identifier: title,
              title: title,
            }}/>
          </section>
        </section>
      </section>
    </Layout>
  )
}

ArticlePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string,
      }),
      frontmatter: PropTypes.shape({
        date: PropTypes.string,
        title: PropTypes.string,
        author: PropTypes.string,
        cover: PropTypes.object,
        meta_title: PropTypes.string,
        meta_description: PropTypes.string,
        tags: PropTypes.array,
      }),
    }),
  }),
}

export default ArticlePage

export const articlePageQuery = graphql`
    query ArticlePage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            html
            fields {
                slug
            }
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                author
                author_link
                cover {
                    childImageSharp {
                        fluid(maxWidth: 800, quality: 72) {
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
