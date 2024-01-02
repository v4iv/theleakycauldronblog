import React from 'react'

interface ContentProps {
  html: string
}

function Content({html}: ContentProps) {
  return (
    <div
      className="prose prose-base prose-slate md:prose-lg dark:prose-invert"
      dangerouslySetInnerHTML={{__html: html}}
    />
  )
}

export default Content
