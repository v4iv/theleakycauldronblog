import React from 'react'
import PropTypes from 'prop-types'
import Content from '../Content'
import { Link } from 'gatsby'
import _ from 'lodash'

const ArticleTemplate = ({
  content,
  date,
  contentComponent,
  cover,
  tags,
  title,
}) => {
  const PostContent = contentComponent || Content

  return (
    <article className='article content'>
      <header className='article-header'>
        <h1 className='is-size-2'>{title}</h1>
      </header>
      <div className='article-meta'>
        <div className='article-date'>
          <small>
            <span className='has-text-primary'>{date}</span>
          </small>
        </div>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <div className='article-tags'>
          {tags && tags.length ? (
            <div className='tags'>
              {tags.map(tag => (
                <Link
                  to={`/tags/${_.kebabCase(tag)}`}
                  key={tag}
                  className='has-text-black is-italic'
                >
                  <small>#{tag}&nbsp;&nbsp;</small>
                </Link>
              ))}
            </div>) : null}
        </div>
      </div>
      <br />
      <br />
      <img src={cover} alt={title} className='image is-full' style={{ width: '100%' }} />
      <section className='section'>
        <PostContent content={content} />
      </section>
    </article>
  )
}

ArticleTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  date: PropTypes.string,
  contentComponent: PropTypes.func,
  cover: PropTypes.string,
  title: PropTypes.string,
}

export default ArticleTemplate
