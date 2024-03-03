import React from 'react'

interface CommentBoxProps {
  id: string
  slug: string
  title: string
  siteURL: string
}

function CommentBox({id, title, slug, siteURL}: CommentBoxProps) {
  const url = siteURL + slug

  // This is just to load the disqus config for the page, Disqus itself is being loaded using Cloudflare Zaraz
  return (
    <>
      <div id="disqus_thread" className="p-3 md:px-0 md:py-5" />

      <script
        dangerouslySetInnerHTML={{
          __html: `var disqus_config = function () {this.page.url = ${url}; this.page.title = ${title}; this.page.identifier = ${id}; };`,
        }}
      />
    </>
  )
}

export default CommentBox
