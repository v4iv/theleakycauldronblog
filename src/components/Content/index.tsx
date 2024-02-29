import React from 'react'

interface ContentProps {
  html: string
}

function Content({html}: ContentProps) {
  return (
    <div
      className="prose prose-base prose-slate dark:prose-invert md:prose-lg"
      dangerouslySetInnerHTML={{__html: html}}
    />
  )
}

export default Content
