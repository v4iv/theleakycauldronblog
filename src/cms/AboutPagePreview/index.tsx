import * as React from 'react'
import {
  TypographyH1,
  TypographyLarge,
  TypographyLead,
} from '../../components/ui/typography'
import ImageBox from '../../components/ImageBox'

function AboutPagePreview({entry, widgetFor}: any) {
  const title = entry.getIn(['data', 'title']) || ''
  const subtitle = entry.getIn(['data', 'subtitle']) || ''
  const author = entry.getIn(['data', 'author']) || ''
  const image = {publicURL: entry.getIn(['data', 'image'])} || {publicURL: ''}
  const body = widgetFor('body') || ''

  return (
    <div>
      <div className="mx-auto w-full max-w-screen-md">
        <div className="px-3 md:px-0 py-3 md:py-5">
          <header className="space-y-3">
            <TypographyH1>{title}</TypographyH1>

            <TypographyLead>{subtitle}</TypographyLead>

            <TypographyLarge>{author}</TypographyLarge>
          </header>
        </div>
      </div>

      <ImageBox
        className="h-auto w-auto object-cover"
        image={image}
        alt={author}
      />

      <div className="mx-auto w-full max-w-screen-md">
        <div className="px-3 md:px-0 py-3 md:py-5">
          <div className="prose prose-slate prose-base md:prose-lg dark:prose-invert">
            {body}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPagePreview
