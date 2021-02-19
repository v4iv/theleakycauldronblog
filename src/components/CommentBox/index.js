import React from 'react'
import PropTypes from 'prop-types'
import { Disqus } from 'gatsby-plugin-disqus'

const CommentBox = (props) => {
  const { id, site_url, path_prefix = '', slug, title } = props

  const real_prefix = path_prefix === '/' ? '' : path_prefix

  const url = site_url + real_prefix + slug

  const disqus_config = {
    url: url,
    identifier: title,
    title: title,
  }

  return (
    <section className='mb3 pa3 pa5-l center' key={id}>
      <Disqus config={disqus_config}/>
    </section>
  )
}

CommentBox.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  site_url: PropTypes.string.isRequired,
  path_prefix: PropTypes.string,
}

export default CommentBox
