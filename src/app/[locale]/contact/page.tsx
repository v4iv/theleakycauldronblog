import {unstable_setRequestLocale} from 'next-intl/server'

import ContactForm from '@/components/contact-form'
import {Separator} from '@/components/ui/separator'
import {TypographyH1, TypographyLead} from '@/components/ui/typography'
import {getContact} from '@/lib/markdowns'

export default function Page({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale)

  const {title, subtitle} = getContact()

  return (
    <div className="mx-auto w-full max-w-screen-md">
      <div className="p-3 md:px-0 md:py-5">
        <header className="space-y-3">
          <TypographyH1>{title}</TypographyH1>

          <TypographyLead>{subtitle}</TypographyLead>

          <Separator />
        </header>

        <div className="py-12">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
