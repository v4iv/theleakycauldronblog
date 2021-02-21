import React from 'react'
import PropTypes from 'prop-types'
import { Disqus } from 'gatsby-plugin-disqus'

const CommentBox = (props) => {
  const { id, siteURL, pathPrefix = '', slug, title } = props

  const realPrefix = pathPrefix === '/' ? '' : pathPrefix

  const url = siteURL + realPrefix + slug

  const disqusConfig = {
    url: url,
    identifier: title,
    title: title,
  }

  return (
    <section className='mb3 pa3 pa5-l center' key={id}>
      <Disqus config={disqusConfig}/>
    </section>
  )
}

CommentBox.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  siteURL: PropTypes.string.isRequired,
  pathPrefix: PropTypes.string,
}

export default CommentBox
