import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/stylesheets/styles.scss'
import ArticleTemplate from '../../components/ArticleTemplate'

const ArticlePreview = ({ entry, widgetFor }) => {
  const date = entry.getIn(['data', 'date'])

  return (
    <div>
      <ArticleTemplate
        content={widgetFor('body')}
        cover={{ publicURL: entry.getIn(['data', 'cover']) }}
        date={date && date.toLocaleString()}
        meta_title={entry.getIn(['data', 'meta_title'])}
        meta_desc={entry.getIn(['data', 'meta_description'])}
        // tags={entry.getIn(['data', 'tags'])}
        title={entry.getIn(['data', 'title'])}
        author={entry.getIn(['data', 'author'])}
      />
    </div>
  )
}

ArticlePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ArticlePreview
