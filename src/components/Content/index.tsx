import React from 'react'

interface ContentProps {
  html: string
}

function Content({html}: ContentProps) {
  return (
    <div
      className="prose prose-lg prose-slate font-serif leading-7 dark:prose-invert md:prose-2xl first-letter:float-left first-letter:pr-4 first-letter:text-7xl first-letter:font-black first-letter:text-aquablue-700 marker:text-aquamarine-500 prose-a:text-aquablue-700 prose-blockquote:border-aquamarine-500 prose-img:rounded-lg prose-hr:border-aquamarine-500"
      dangerouslySetInnerHTML={{__html: html}}
    />
  )
}

export default Content
