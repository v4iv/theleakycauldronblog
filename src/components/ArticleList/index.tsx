import React from 'react'
import {Link} from 'gatsby'
import {useTranslation} from 'gatsby-plugin-react-i18next'
import {
  TypographyH2,
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from '@/components/ui/typography'
import {Separator} from '@/components/ui/separator'
import ImageBox from '@/components/ImageBox'

interface ArticleListProps {
  pages: {
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
        templateKey: string
      }
    }
  }[]
}

function ArticleList({pages}: ArticleListProps) {
  const {t} = useTranslation()

  return (
    <section className="mx-auto w-full max-w-screen-md">
      {pages
        .filter(
          (page) => page?.node?.frontmatter?.templateKey === 'article-page',
        )
        .map(
          (
            {
              node: {
                excerpt,
                fields: {slug},
                frontmatter: {title, cover, author, date},
              },
            },
            idx,
          ) => (
            <article key={`${slug}-${idx}`} className="px-3 py-5 md:px-0">
              <div className="flex flex-col md:flex-row">
                <div className="order-2 mb-2 pr-0 md:order-1 md:w-3/5 md:pr-3">
                  <Link
                    className="block px-0 hover:text-muted-foreground"
                    to={slug}
                  >
                    <TypographyH2>{title}</TypographyH2>

                    <TypographyP>{excerpt}</TypographyP>
                  </Link>
                </div>

                <div className="order-1 mb-4 w-full pl-0 md:order-last md:mb-0 md:ml-auto md:w-2/5 md:pl-3">
                  <div className="overflow-hidden rounded-md">
                    <Link className="block px-0" to={slug}>
                      <ImageBox
                        className="block aspect-video h-auto w-full object-cover transition-all duration-300 hover:scale-105 md:aspect-[4/3]"
                        image={cover}
                        alt={slug}
                      />
                    </Link>
                  </div>
                </div>
              </div>

              <TypographyMuted>
                {t('by-author', {author: author.toUpperCase()})}
              </TypographyMuted>

              <time className="block">
                <TypographySmall>{date}</TypographySmall>
              </time>

              <Separator className="mt-7" />
            </article>
          ),
        )}
    </section>
  )
}

export default ArticleList
