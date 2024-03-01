import React from 'react'
import {Script} from 'gatsby'
interface CommentBoxProps {
  id: string
  slug: string
  title: string
  siteURL: string
}

function CommentBox({id, slug, siteURL}: CommentBoxProps) {
  const url = siteURL + slug

  return (
    <>
      <div id="disqus_thread" className="p-3 md:px-0 md:py-5" />
      <Script id="disqus-config-loader">
        {`
          var disqus_config = function () {
            this.page.url = ${url};  // Replace PAGE_URL with your page's canonical URL variable
            this.page.identifier = ${id}; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
          };
        `}
      </Script>
    </>
  )
}

export default CommentBox
