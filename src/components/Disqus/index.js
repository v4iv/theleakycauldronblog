import React from 'react'
import PropTypes from 'prop-types'
import ReactDisqusComments from 'react-disqus-comments'
import config from '../../../config'

const Disqus = ({ title, slug }) => {
  if (!config.disqusShortname) {
    return null
  }
  const url = config.siteUrl + slug
  return (
    <section className='mb3 pa3 pa5-l center'>
      <ReactDisqusComments
        shortname={config.disqusShortname}
        identifier={title}
        title={title}
        url={url}
        onNewComment={comment => console.log('New Comment Available!:\n', comment.text)}
      />
    </section>
  )
}

Disqus.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
}

export default Disqus
