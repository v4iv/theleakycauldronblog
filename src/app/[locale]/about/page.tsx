import Image from 'next/image'
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'
import {unstable_setRequestLocale} from 'next-intl/server'

import {getAbout} from '@/lib/markdowns'
import {
  TypographyH1,
  TypographyLarge,
  TypographyLead,
} from '@/components/ui/typography'

export default function Page({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale)

  const {title, subtitle, author, cover, content} = getAbout()

  return (
    <main>
      <div className="mx-auto w-full max-w-screen-md">
        <div className="p-3 md:px-0 md:py-5">
          <header className="space-y-3">
            <TypographyH1>{title}</TypographyH1>

            <TypographyLead>{subtitle}</TypographyLead>

            <TypographyLarge>{author}</TypographyLarge>
          </header>
        </div>
      </div>

      <Image
        className="h-auto w-full object-cover"
        src={cover}
        alt={author}
        width={1024}
        height={500}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />

      <div className="mx-auto w-full max-w-screen-md">
        <div className="p-3 md:px-0 md:py-5">
          <Markdown
            className="prose prose-base prose-slate dark:prose-invert md:prose-lg"
            remarkPlugins={[remarkGfm]}
          >
            {content}
          </Markdown>
        </div>
      </div>
    </main>
  )
}
