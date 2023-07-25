import * as React from 'react'
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
            <article key={`${slug}-${idx}`} className="py-5 px-3 md:px-0">
              <div className="flex md:flex-row flex-col">
                <div className="md:w-90 md:pr-3 pr-0 order-2 md:order-1 md:w-3/5 mb-2">
                  <Link
                    className="block px-0 lg:px-0 hover:text-muted-foreground"
                    to={slug}
                  >
                    <TypographyH2>{title}</TypographyH2>

                    <TypographyP>{excerpt}</TypographyP>
                  </Link>
                </div>

                <div className="md:pl-3 pl-0 order-1 mb-4 md:mb-0 w-full md:w-2/5 md:ml-auto md:order-last">
                  <div className="overflow-hidden rounded-md">
                    <Link className="block px-0 lg:px-0 transform" to={slug}>
                      <ImageBox
                        className="block h-auto w-auto object-cover transition-all hover:scale-105 duration-300 aspect-video md:aspect-[4/3]"
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
