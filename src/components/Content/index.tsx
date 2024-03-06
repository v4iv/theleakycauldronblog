import React from 'react'

interface ContentProps {
  html: string
}

function Content({html}: ContentProps) {
  return (
    <div
      className="prose prose-base prose-slate font-serif dark:prose-invert md:prose-xl"
      dangerouslySetInnerHTML={{__html: html}}
    />
  )
}

export default Content
