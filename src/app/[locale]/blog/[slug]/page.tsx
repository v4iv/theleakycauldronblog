import slugify from 'slugify'
import Image from 'next/image'
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'
import {useTranslations} from 'next-intl'
import {unstable_setRequestLocale} from 'next-intl/server'

import {Link} from '@/navigation'
import {getArticleBySlug, getArticles} from '@/lib/markdowns'
import ShareSheet from '@/components/share-sheet'
import {badgeVariants} from '@/components/ui/badge'
import {TypographyH1, TypographyLead} from '@/components/ui/typography'
import CommentBox from '@/components/comment-box'

type Props = {
  params: {
    locale: string
    slug: string
  }
}

export default function Page({params: {locale, slug}}: Props) {
  unstable_setRequestLocale(locale)

  const t = useTranslations('common')

  const {id, title, author, authorLink, cover, date, tags, content} =
    getArticleBySlug(slug)

  const publishDate = `${new Date(date).toLocaleString('default', {
    month: 'long',
  })} ${new Date(date).getDate()}, ${new Date(date).getFullYear()}`

  return (
    <article>
      <div className="mx-auto w-full max-w-screen-md">
        <div className="p-3 md:px-0 md:py-5">
          <header className="space-y-3">
            <TypographyH1>{title}</TypographyH1>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-x-2">
                <TypographyLead>
                  <a
                    className="hover:text-primary"
                    rel="noreferrer nofollow noopener"
                    href={authorLink}
                  >
                    {author}
                  </a>
                </TypographyLead>

                <TypographyLead>&middot;</TypographyLead>

                <TypographyLead>{publishDate}</TypographyLead>
              </div>

              <div className="hidden md:flex">
                <ShareSheet title={title} slug={slug} />
              </div>
            </div>

            <div className="flex flex-wrap gap-y-1">
              {tags.map((tag, idx) => (
                <Link
                  key={`${slugify(tag)}-${idx}`}
                  className={`${badgeVariants({variant: 'default'})} mr-2`}
                  href={`/tags/${slugify(tag)}/`}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </header>
        </div>
      </div>

      <Image
        className="aspect-video h-auto w-full object-cover"
        src={cover}
        alt={slug}
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

        <div className="flex justify-center">
          <ShareSheet
            title={title}
            slug={slug}
            side="top"
            orientation="horizontal"
          />
        </div>

        <CommentBox
          id={id}
          url={`${t('site-url')}/blog/${slug}`}
          title={title}
        />
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const articles = getArticles()

  return articles.map((article) => ({
    slug: article.slug,
  }))
}
