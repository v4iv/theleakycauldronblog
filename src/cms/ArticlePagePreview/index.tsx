import * as React from 'react'
import {Link} from 'gatsby'
import slugify from 'slugify'
import {Separator} from '../../components/ui/separator'
import {badgeVariants} from '../../components/ui/badge'
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
          <div className="px-3 md:px-0 py-3 md:py-5">
            <header className="space-y-3">
              <TypographyH1>{title}</TypographyH1>

              <div className="flex items-center h-6 space-x-2">
                <TypographyLead>
                  <a
                    className="hover:text-primary"
                    rel="noreferrer nofollow noopener"
                    href={authorLink}
                  >
                    {author}
                  </a>
                </TypographyLead>

                <Separator orientation="vertical" />

                <TypographyLead>{displayDate}</TypographyLead>
              </div>

              <div className="space-x-2">
                {tags.map((tag: any, idx: number) => (
                  <Link
                    key={`${slugify(tag)}-${idx}`}
                    className={badgeVariants({variant: 'default'})}
                    to={`/tags/${slugify(tag)}`}
                  >
                    #{tag}&nbsp;
                  </Link>
                ))}
              </div>
            </header>
          </div>
        </div>

        {!!cover.length && (
          <img
            className="h-auto w-full object-cover aspect-video"
            src={cover}
            alt={title}
          />
        )}

        <div className="mx-auto w-full max-w-screen-md">
          <div className="px-3 md:px-0 py-3 md:py-5">
            <div className="prose prose-slate prose-base md:prose-lg dark:prose-invert">
              {body}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default ArticlePagePreview
