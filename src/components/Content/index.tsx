import React from 'react'

interface ContentProps {
  html: string
}

function Content({html}: ContentProps) {
  return (
    <div
      className="prose prose-lg prose-slate font-serif leading-7 dark:prose-invert md:prose-2xl marker:text-aquablue-700 prose-a:text-aquamarine-500 prose-blockquote:border-aquablue-700 prose-img:rounded-lg prose-hr:border-aquablue-700"
      dangerouslySetInnerHTML={{__html: html}}
    />
  )
}

export default Content
