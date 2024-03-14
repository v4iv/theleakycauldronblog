import React from 'react'

import {
  TypographyH1,
  TypographyLarge,
  TypographyLead,
} from '../../components/ui/typography'

function AboutPagePreview({entry, widgetFor}: any) {
  const title = entry.getIn(['data', 'title']) || 'Title'
  const subtitle = entry.getIn(['data', 'subtitle']) || 'Subtitle'
  const author = entry.getIn(['data', 'author']) || 'The Leaky Cauldron Blog'
  const image = entry.getIn(['data', 'image'])
  const body = widgetFor('body')

  return (
    <div>
      <div className="mx-auto w-full max-w-screen-md">
        <div className="p-3 md:px-0 md:py-5">
          <header className="space-y-3">
            <TypographyH1>{title}</TypographyH1>

            <TypographyLead>{subtitle}</TypographyLead>

            <TypographyLarge>{author}</TypographyLarge>
          </header>
        </div>
      </div>

      {!!image.length && (
        <img className="h-auto w-full object-cover" src={image} alt={author} />
      )}

      <div className="mx-auto w-full max-w-screen-md">
        <div className="p-3 md:px-0 md:py-5">
          <div className="prose prose-lg prose-slate font-serif leading-7 dark:prose-invert md:prose-2xl first-letter:float-left first-letter:pr-4 first-letter:text-7xl first-letter:font-black first-letter:text-aquablue-700 marker:text-aquamarine-500 prose-a:text-aquablue-700 prose-blockquote:border-aquamarine-500 prose-img:rounded-lg prose-hr:border-aquamarine-500">
            {body}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPagePreview
