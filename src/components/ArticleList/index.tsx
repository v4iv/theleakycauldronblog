import React from 'react'
import {Link} from 'gatsby'
import {useTranslation} from 'gatsby-plugin-react-i18next'

import ImageBox from '@/components/ImageBox'
import {
  TypographyH2,
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from '@/components/ui/typography'
import {Badge} from '@/components/ui/badge'
import {Separator} from '@/components/ui/separator'

interface ArticleListProps {
  posts: {
    node: {
      excerpt: string
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
        cover: {
          childImageSharp: any
          publicURL: string
        }
        author: string
        date: string
        tags: string[]
        templateKey: string
      }
    }
  }[]
}

function ArticleList({posts}: ArticleListProps) {
  const {t} = useTranslation()

  return (
    <section className="mx-auto w-full max-w-screen-md">
      {posts.map(
        (
          {
            node: {
              excerpt,
              fields: {slug},
              frontmatter: {title, cover, author, date, tags},
            },
          },
          idx,
        ) => {
          const isGuestAuthor = tags.includes('guest author')

          return (
            <article key={`${slug}-${idx}`} className="px-3 py-5 md:px-0">
              <div className="flex flex-col md:flex-row">
                <div className="order-2 mb-2 pr-0 md:order-1 md:w-3/5 md:pr-3">
                  <Link
                    className="block px-0 hover:text-muted-foreground"
                    to={slug}
                  >
                    <TypographyH2>{title}</TypographyH2>

                    <TypographyP className="font-serif text-lg md:text-xl">
                      {excerpt}
                    </TypographyP>
                  </Link>
                </div>

                <div className="order-1 mb-4 w-full pl-0 md:order-last md:mb-0 md:ml-auto md:w-2/5 md:pl-3">
                  <div
                    className={`${isGuestAuthor && 'relative'} overflow-hidden rounded-md`}
                  >
                    <Link className="block px-0" to={slug}>
                      <ImageBox
                        className="block aspect-video h-auto w-full object-cover transition-all duration-300 hover:scale-105 md:aspect-[4/3]"
                        image={cover}
                        alt={slug}
                      />

                      {isGuestAuthor && (
                        <Badge
                          className="absolute right-0 top-0 mr-1 mt-1"
                          variant="destructive"
                        >
                          {t('guest-author')}
                        </Badge>
                      )}
                    </Link>
                  </div>
                </div>
              </div>

              <TypographyMuted className="font-mono">
                {t('by-author', {author: author.toUpperCase()})}
              </TypographyMuted>

              <time className="block font-mono">
                <TypographySmall>{date}</TypographySmall>
              </time>

              <Separator className="mt-7" />
            </article>
          )
        },
      )}
    </section>
  )
}

export default ArticleList
