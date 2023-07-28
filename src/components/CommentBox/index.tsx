import * as React from 'react'
import {Script} from 'gatsby'
// import {Disqus} from 'gatsby-plugin-disqus'

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
    <>
      <div id="disqus_thread" className="px-3 md:px-0 py-3 md:py-5"></div>
      <Script id="disqus-config">
        {`
        var disqus_config = function () {
          this.page.title = ${disqusConfig.title}
          this.page.url = ${disqusConfig.url};
          this.page.identifier = ${disqusConfig.identifier};
        };
        `}
      </Script>
    </>
  )
}

export default CommentBox
