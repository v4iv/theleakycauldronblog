import React from 'react'
import {Link} from 'gatsby'
import slugify from 'slugify'
import {badgeVariants} from '../../components/ui/badge'
import {Separator} from '../../components/ui/separator'
import {TypographyH1, TypographyLead} from '../../components/ui/typography'
import Content from '../../components/Content'
import ImageBox from '../../components/ImageBox'

function ArticlePagePreview({entry, widgetFor}: any) {
  const title = entry.getIn(['data', 'title']) || ''
  const date = entry.getIn(['data', 'date']) || ''
  const authorLink = entry.getIn(['data', 'subtitle']) || ''
  const author = entry.getIn(['data', 'author']) || ''
  const cover = {publicURL: entry.getIn(['data', 'cover'])} || {publicURL: ''}
  const html = widgetFor('body') || ''
  const tags = entry.getIn(['data', 'tags']) || []

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

                <TypographyLead>{date}</TypographyLead>
              </div>

              <div className="space-x-2">
                {tags &&
                  tags.toJS().map((tag: any, idx: number) => (
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

        <ImageBox
          className="h-auto w-full object-cover aspect-video"
          image={cover}
          alt={title}
        />

        <div className="mx-auto w-full max-w-screen-md">
          <div className="px-3 md:px-0 py-3 md:py-5">
            <Content html={html} />
          </div>
        </div>
      </article>
    </div>
  )
}

export default ArticlePagePreview
