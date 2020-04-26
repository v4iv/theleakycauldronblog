import React from 'react'
import PropTypes from 'prop-types'
import ReactDisqusComments from 'react-disqus-comments'

const Disqus = (props) => {
  const { title, slug, siteUrl, disqusShortname } = props
  if (!disqusShortname) {
    return null
  }

  const url = siteUrl + slug

  return <section className='mb3 pa3 pa5-l center'>
    <ReactDisqusComments
      shortname={disqusShortname}
      identifier={title}
      title={title}
      url={url}
      onNewComment={comment => console.log('New Comment Available!:\n', comment.text)}
    />
  </section>
}

Disqus.propTypes = {
  identifier: PropTypes.any,
  title: PropTypes.string,
  slug: PropTypes.string,
  siteUrl: PropTypes.string,
  disqusShortname: PropTypes.string,
}

export default Disqus
