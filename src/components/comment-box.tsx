'use client'

import React, {use} from 'react'
import {useTheme} from 'next-themes'
import {DiscussionEmbed} from 'disqus-react'

interface Props {
  id: string
  url: string
  title: string
}

function CommentBox({id, url, title}: Props) {
  const {theme} = useTheme()

  return (
    <div className="p-3 md:px-0 md:py-5">
      <DiscussionEmbed
        key={theme}
        shortname="https-theleakycauldronblog-com"
        config={{
          url: url,
          identifier: id,
          title: title,
        }}
      />
    </div>
  )
}

export default CommentBox
