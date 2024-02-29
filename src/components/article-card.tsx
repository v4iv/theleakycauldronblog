'use client'

import React from 'react'
import Image from 'next/image'
import removeMarkdown from 'remove-markdown'
import {useTranslations} from 'next-intl'

import {Link} from '@/navigation'
import ArticleType from '@/types/article.type'
import {
  TypographyH2,
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from '@/components/ui/typography'
import {Separator} from '@/components/ui/separator'

export default function ArticleCard({
  article: {slug, title, cover, excerpt = '', author, date},
}: {
  article: ArticleType
}) {
  const t = useTranslations('common')

  const publishDate = `${new Date(date).toLocaleString('default', {
    month: 'long',
  })} ${new Date(date).getDate()}, ${new Date(date).getFullYear()}`

  return (
    <article className="px-3 py-5 md:px-0">
      <div className="flex flex-col md:flex-row">
        <div className="order-2 mb-2 pr-0 md:order-1 md:w-3/5 md:pr-3">
          <Link
            className="block px-0 hover:text-muted-foreground"
            href={`/blog/${slug}`}
          >
            <TypographyH2>{title}</TypographyH2>

            <TypographyP>{removeMarkdown(excerpt)}&hellip;</TypographyP>
          </Link>
        </div>

        <div className="order-1 mb-4 w-full pl-0 md:order-last md:mb-0 md:ml-auto md:w-2/5 md:pl-3">
          <div className="overflow-hidden rounded-md">
            <Link className="block px-0" href={`/blog/${slug}`}>
              <Image
                className="block aspect-video h-auto w-full object-cover transition-all duration-300 hover:scale-105 md:aspect-[4/3]"
                src={cover}
                alt={slug}
                width={400}
                height={400}
              />
            </Link>
          </div>
        </div>
      </div>

      <TypographyMuted>
        {t('by-author', {author: author.toUpperCase()})}
      </TypographyMuted>

      <time className="block">
        <TypographySmall>{publishDate}</TypographySmall>
      </time>

      <Separator className="mt-7" />
    </article>
  )
}
