import React from 'react'
import slugify from 'slugify'

import {Badge} from '../../components/ui/badge'
import {TypographyH1, TypographyLead} from '../../components/ui/typography'

function ArticlePagePreview({entry, widgetFor}: any) {
  const title = entry.getIn(['data', 'title']) || 'Title'
  const date = entry.getIn(['data', 'date'])
  const authorLink =
    entry.getIn(['data', 'subtitle']) || 'https://twitter.com/waybove'
  const author = entry.getIn(['data', 'author'])
  const cover = entry.getIn(['data', 'cover']) || ''
  const body = widgetFor('body')
  const tags = entry.getIn(['data', 'tags']) || []

  const displayDate = `${date.toLocaleString('default', {
    month: 'long',
  })} ${date.getDate()}, ${date.getFullYear()}`

  return (
    <div>
      <article>
        <div className="mx-auto w-full max-w-screen-md">
          <div className="p-3 md:px-0 md:py-5">
            <header className="space-y-3">
              <TypographyH1>{title}</TypographyH1>

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

                <TypographyLead>{displayDate}</TypographyLead>
              </div>

              <div className="flex flex-wrap gap-y-1">
                {tags.map((tag: any, idx: number) => (
                  <Badge key={`${slugify(tag)}-${idx}`} className="mr-2">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </header>
          </div>
        </div>

        {!!cover.length && (
          <img
            className="aspect-video h-auto w-full object-cover"
            src={cover}
            alt={title}
          />
        )}

        <div className="mx-auto w-full max-w-screen-md">
          <div className="p-3 md:px-0 md:py-5">
            <div className="prose prose-lg prose-slate font-serif leading-7 dark:prose-invert md:prose-2xl first-letter:float-left first-letter:pr-4 first-letter:text-7xl first-letter:font-black first-letter:text-aquablue-700 marker:text-aquamarine-500 prose-a:text-aquablue-700 prose-blockquote:border-aquamarine-500 prose-img:rounded-lg prose-hr:border-aquamarine-500">
              {body}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default ArticlePagePreview
