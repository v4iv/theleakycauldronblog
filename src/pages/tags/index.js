import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'

const TagsPage = ({
  data: { allMarkdownRemark: { group }, site: { siteMetadata: { title } } },
}) => (
  <div>
    <Helmet title={`Tags | ${title}`} />
    <section className='section'>
      <div className='container content'>
        <div className='columns'>
          <div
            className='column is-10 is-offset-1'
            style={{ marginBottom: '6rem' }}
          >
            <section>
              <div className='content'>
                <h3 className='has-text-weight-semibold is-size-2 title'>
                  Tags
                </h3>
              </div>
            </section>
            <ul className='taglist'>
              {group.map(tag => (
                <li key={tag.fieldValue}>
                  <Link
                    className='has-text-primary'
                    to={`/tags/${kebabCase(tag.fieldValue)}/`}
                  >
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
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
