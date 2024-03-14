import React from 'react'

interface ContentProps {
  html: string
}

function Content({html}: ContentProps) {
  return (
    <div
      className="prose prose-lg prose-slate font-serif leading-7 dark:prose-invert md:prose-2xl marker:text-aquamarine-500 prose-a:text-aquablue-700 prose-blockquote:border-aquamarine-500 prose-img:rounded-lg prose-hr:border-aquamarine-500"
      dangerouslySetInnerHTML={{__html: html}}
    />
  )
}

export default Content
