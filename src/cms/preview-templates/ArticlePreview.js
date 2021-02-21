import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/stylesheets/styles.scss'
import ArticleTemplate from '../../components/ArticleTemplate'

const ArticlePreview = (props) => {
  const { entry, widgetFor } = props
  const title = entry.getIn(['data', 'title'])
  const author = entry.getIn(['data', 'author'])
  const authorLink = entry.getIn(['data', 'authorLink'])
  const cover = { publicURL: entry.getIn(['data', 'cover']) }
  const date = entry.getIn(['data', 'date'])
  // const tags = entry.getIn(['data', 'tags'])
  const content = widgetFor('body')

  return <div>
    <ArticleTemplate
      title={title}
      author={author}
      authorLink={authorLink}
      cover={cover}
      date={date && date.toLocaleString()}
      // tags={tags}
      content={content}
    />
  </div>
}

ArticlePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ArticlePreview
