import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { kebabCase } from 'lodash'
import Content from '../Content'
import ProgressiveImageContainer from '../ProgressiveImageContainer'
import './styles.scss'
import 'prismjs/themes/prism-tomorrow.css'

const ArticleTemplate = (props) => {
  const { content, date, contentComponent, cover, tags, title, author, authorLink } = props
  const PostContent = contentComponent || Content

  return (
    <article className='baskerville pb3'>
      <section className='mw8 center'>
        <header className='avenir tc-l ph3 ph4-ns pt4 pt5-ns'>
          <h1 className='f3 f2-m f-subheadline-l measure lh-title fw1 mt0'>{title}</h1>

          <div className='flex db mb4'>
            <p className='f5 f4-l db fw1 baskerville mb4-l mb2'><a
              href={authorLink}
              className='no-underline black dim'>{author}</a> | {date}
            </p>

            <div className='inline-flex flex-wrap'>
              {tags && tags.length &&
              tags.map(tag => (
                <Link
                  to={`/tags/${kebabCase(tag)}`}
                  key={tag}
                  className='no-underline black dim avenir'
                >
                  <small className='f6 f4-l fw1'>#{tag}&nbsp;&nbsp;</small>
                </Link>
              ))}
            </div>
          </div>
        </header>
      </section>

      <ProgressiveImageContainer
        className='w-100 dib f3'
        image={cover}
        alt={title}
      />

      <section className='mw8 center'>
        <div className='ph3 ph4-m ph5-l'>
          <PostContent content={content} className='measure db center f5 f4-ns lh-copy html-content' />
        </div>
      </section>
    </article>
  )
}

ArticleTemplate.propTypes = {
  content: PropTypes.string,
  date: PropTypes.string,
  contentComponent: PropTypes.func,
  cover: PropTypes.object,
  tags: PropTypes.array,
  title: PropTypes.string,
  author: PropTypes.string,
  authorLink: PropTypes.string,
}

export default ArticleTemplate
