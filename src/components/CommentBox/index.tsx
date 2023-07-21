import * as React from 'react'
import {Disqus} from 'gatsby-plugin-disqus'

interface CommentBoxProps {
  id: string
  slug: string
  title: string
  siteURL: string
}

function CommentBox({id, slug, title, siteURL}: CommentBoxProps) {
  const url = siteURL + slug

  const disqusConfig = {
    url: url,
    title: title,
    identifier: id,
  }

  return (
    <div className="px-3 md:px-0 py-3 md:py-5">
      <Disqus config={disqusConfig} />
    </div>
  )
}

export default CommentBox
