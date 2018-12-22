import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

const TagsPage = ({
  data: { allMarkdownRemark: { group }, site: { siteMetadata: { title } } },
}) => (
  <Layout>
    <Helmet title={`Tags | ${title}`} />
    <section className='mw7 center avenir'>
      <header className='tc'>
        <h1 className='f1 code mb1 fw1 dib tracked-tight'>Tags</h1>
      </header>
      <ul className='list ph3 ph5-ns pv4 tc'>
        {group.map(tag => (
          <li key={tag.fieldValue} className='dib mr1 mb2'>
            <Link
              className='f6 f5-ns fw4 b db pa2 link dim dark-gray ba b--black-20'
              to={`/tags/${kebabCase(tag.fieldValue)}/`}
            >
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
)

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
