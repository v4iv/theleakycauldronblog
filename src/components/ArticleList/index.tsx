import * as React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash.kebabcase"
import {
  TypographyH2,
  TypographyLead,
  TypographyMuted,
  TypographyP,
} from "@/components/ui/typography"
import { Button } from "@/components/ui/button"

interface ArticleListProps {
  articles: {
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
      }
    }
  }[]
}

const ArticleList: React.FC<ArticleListProps> = (props) => {
  const { articles } = props

  return (
    <>
      {articles.map(({ node }, idx) => {
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
              <Link to={slug}>Continue Reading...</Link>
            </Button>

            {tags.map((tag, idx) => (
              <TypographyMuted key={`${idx}`}>
                <Link to={`/tag/${kebabCase(tag)}`}>#{tag}&nbsp;</Link>
              </TypographyMuted>
            ))}
          </article>
        )
      })}
    </>
  )
}

export default ArticleList
