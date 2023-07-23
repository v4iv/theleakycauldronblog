import React from 'react'
import {Separator} from '../../components/ui/separator'
import {TypographyH1, TypographyLead} from '../../components/ui/typography'

function ContactPagePreview({entry}: any) {
  const title = entry.getIn(['data', 'title']) || ''
  const subtitle = entry.getIn(['data', 'subtitle']) || ''

  return (
    <div className="mx-auto w-full max-w-screen-md">
      <div className="px-3 md:px-0 py-3 md:py-5">
        <header className="space-y-3">
          <TypographyH1>{title}</TypographyH1>

          <TypographyLead>{subtitle}</TypographyLead>

          <Separator />
        </header>
      </div>
    </div>
  )
}

export default ContactPagePreview
