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
          <div className="prose prose-base prose-slate dark:prose-invert md:prose-lg">
            {body}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPagePreview
