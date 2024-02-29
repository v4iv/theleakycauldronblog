import slugify from 'slugify'
import {useTranslations} from 'next-intl'
import {unstable_setRequestLocale} from 'next-intl/server'

import {Link} from '@/navigation'
import {getTags} from '@/lib/markdowns'
import {Separator} from '@/components/ui/separator'
import {badgeVariants} from '@/components/ui/badge'
import {TypographyH1} from '@/components/ui/typography'

export default function Page({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale)

  const t = useTranslations('common')

  const tags = getTags()

  return (
    <div className="mx-auto w-full max-w-screen-md">
      <div className="p-3 md:px-0 md:py-5">
        <header className="space-y-3">
          <TypographyH1>{t('tags')}</TypographyH1>

          <Separator />
        </header>

        <div className="flex flex-wrap gap-y-4 py-12">
          {tags?.map((tag, idx) => (
            <Link
              key={`${tag.fieldValue}-${idx}`}
              href={`/tags/${slugify(tag.fieldValue)}/`}
              className={`${badgeVariants({
                variant: 'outline',
              })} mr-4`}
            >
              #{tag.fieldValue} ({tag.totalCount})
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
