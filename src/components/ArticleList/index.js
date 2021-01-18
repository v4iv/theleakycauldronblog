import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { get } from 'lodash'
import ProgressiveImageContainer from '../ProgressiveImageContainer'

const ArticleList = (props) => {
  const { posts } = props

  return <section className='mw7 center avenir'>
    {posts
      .filter(post => post.node.frontmatter.templateKey === 'article-page')
      .map(({ node: post }) => {
        return (
          <article key={post.id} className='pv4 bb b--black-10 ph3 ph0-l'>
            <div className='flex flex-column flex-row-ns'>
              <div className='w-100 w-60-ns pr3-ns order-2 order-1-ns'>
                <Link className='db ph0-l no-underline black dim' to={post.fields.slug}>
                  <h1 className='f3 fw1 baskerville mt0 lh-title'>{post.frontmatter.title}</h1>

                  <p className='f6 f5-l lh-copy fw1'>
                    {post.excerpt}
                  </p>
                </Link>
              </div>

              <div className='pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns'>
                <Link className='db ph0-l no-underline black grow' to={post.fields.slug}>
                  <ProgressiveImageContainer
                    className='db'
                    image={get(post, ['frontmatter', 'cover'])}
                    alt={get(post, ['frontmatter', 'title'], '')}
                  />
                </Link>
              </div>
            </div>

            <small className='f6 lh-copy gray mv0'>By <span
              className='ttu'>{get(post, ['frontmatter', 'author'], '')}</span></small>

            <time className='db black'>
              <small>{get(post, ['frontmatter', 'date'], '')}</small>
            </time>
          </article>
        )
      })}
  </section>
}

ArticleList.propTypes = {
  posts: PropTypes.array,
}

export default ArticleList
