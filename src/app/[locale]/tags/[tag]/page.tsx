import slugify from 'slugify'
import {Hash} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {unstable_setRequestLocale} from 'next-intl/server'

import {
  TypographyH1,
  TypographyH2,
  TypographyLead,
} from '@/components/ui/typography'
import {getArticlesByTag, getTags} from '@/lib/markdowns'
import {Separator} from '@/components/ui/separator'
import {Link} from '@/navigation'
import ArticleType from '@/types/article.type'

type Props = {
  params: {
    locale: string
    tag: string
  }
}

export default function Page({params: {locale, tag}}: Props) {
  unstable_setRequestLocale(locale)

  const t = useTranslations('common')

  const {articles, totalCount} = getArticlesByTag(tag)

  return (
    <div className="mx-auto w-full max-w-screen-md">
      <div className="p-3 md:px-0 md:py-5">
        <header className="space-y-3">
          <TypographyH1>
            <span className="flex items-end">
              <Hash className="mr-1 size-11" />
              {tag.split('-').join(' ')}
            </span>
          </TypographyH1>

          <TypographyLead>
            {t('tag-subtitle', {
              count: totalCount,
              tag: tag.split('-').join(' '),
            })}
          </TypographyLead>

          <Separator />
        </header>

        <section>
          {articles.map((article, idx) => {
            return (
              <article
                key={`${article.slug}-${idx}`}
                className="border-b py-6 last:border-none"
              >
                <TypographyH2>
                  <Link
                    className="hover:text-muted-foreground"
                    href={`/blog/${article.slug}`}
                  >
                    {article.title}
                  </Link>
                </TypographyH2>
              </article>
            )
          })}
        </section>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const tags = getTags()

  return tags.map((tag) => ({
    tag: tag.fieldValue,
  }))
}
