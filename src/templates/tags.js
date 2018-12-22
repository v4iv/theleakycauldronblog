import React, {Component} from 'react'
import Helmet from 'react-helmet'
import {Link, graphql} from 'gatsby'
import Layout from '../components/Layout'

class TagRoute extends Component {
  render () {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map(post => (
      <div key={post.node.fields.slug} className='pv4 bb bt b--black-10 ph3 ph0-l'>
        <Link to={post.node.fields.slug} className='link dim no-underline black'>
          <h2 className='if3 f2-m f-subheadline-l measure lh-title fw1 mt0 mb0'>{post.node.frontmatter.title}</h2>
        </Link>
      </div>
    ))
    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with “${tag}”`

    return (
      <Layout>
        <section className='pa3'>
          <Helmet title={`${tag} | ${title}`} />
          <section className='mw7 center avenir'>
            <div className='tc'>
              <h3 className='f2 lh-title fw4 mb3 mt0 pt3 bw2 avenir'>{tagHeader}</h3>
              <div className='taglist'>{postLinks}</div>
              <p className='mb5'>
                <Link to='/tags/' className='no-underline black dim avenir'>
                  Browse all tags
                </Link>
              </p>
            </div>
          </section>
        </section>
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
    query TagPage($tag: String) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            limit: 1000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`
