import * as React from 'react'
import {Link} from 'gatsby'
import kebabCase from 'lodash.kebabcase'
import {ChevronRight} from 'lucide-react'
import {
  TypographyH2,
  TypographyLead,
  TypographyP,
} from '@/components/ui/typography'
import {Button} from '@/components/ui/button'
import {badgeVariants} from '@/components/ui/badge'

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
        tags: string[]
        date: string
        templateKey: string
      }
    }
  }[]
}

const ArticleList: React.FC<ArticleListProps> = (props) => {
  const {pages} = props

  return (
    <>
      {pages
        .filter(
          (page) => page?.node?.frontmatter?.templateKey === 'article-page',
        )
        .map(({node}, idx) => {
          const title = node.frontmatter.title
          const slug = node.fields.slug
          const excerpt = node.excerpt
          const author = node.frontmatter.author
          const tags = node.frontmatter.tags
          const date = node.frontmatter.date

          return (
            <article key={`${slug}-${idx}`}>
              <TypographyH2>
                <Link to={slug}>{title}</Link>
              </TypographyH2>

              <TypographyLead>
                {date}&nbsp;&bull;&nbsp;{author}
              </TypographyLead>

              <TypographyP>{excerpt}</TypographyP>
              <Button variant="link" asChild>
                <Link to={slug}>
                  Continue Reading <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              {tags?.map((tag, idx) => (
                <Link
                  key={`${kebabCase(tag)}-${idx}`}
                  className={`${badgeVariants({variant: 'default'})} mr-2`}
                  to={`/tags/${kebabCase(tag)}`}
                >
                  #{tag}&nbsp;
                </Link>
              ))}
            </article>
          )
        })}
    </>
  )
}

export default ArticleList
