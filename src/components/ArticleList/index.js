import React from 'react'
import _ from 'lodash'
import {Link} from 'gatsby'
import Img from 'gatsby-image'

const ArticleList = ({posts}) => {
  return (
    <section className='mw7 center avenir'>
      {posts
        .filter(post => post.node.frontmatter.templateKey === 'article-page')
        .map(({node: post}) => {
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
                    {!!post.frontmatter.cover && !!post.frontmatter.cover.childImageSharp
                      ? <Img className='db'
                        fluid={post.frontmatter.cover.childImageSharp.fluid}
                        alt={post.frontmatter.title} />
                      : <img className='db'
                        src={post.frontmatter.cover.publicURL}
                        alt={post.frontmatter.title} />
                    }
                  </Link>
                </div>
              </div>
              <time className='f6 db gray'>{post.frontmatter.date}</time>
              <div className='flex pv2 ph0'>
                {post.frontmatter.tags.map(tag => (
                  <Link
                    to={`/tags/${_.kebabCase(tag)}`}
                    key={tag}
                    className='no-underline black dim'
                  >
                    <small>#{tag} &nbsp;</small>
                  </Link>
                ))}
              </div>
            </article>
          )
        })}
    </section>
  )
}

export default ArticleList
