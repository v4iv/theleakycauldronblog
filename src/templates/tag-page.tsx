import * as React from 'react'
import {Link, graphql} from 'gatsby'
import {
  TypographyH1,
  TypographyH2,
  TypographyLead,
} from '@/components/ui/typography'
import Layout from '@/components/Layout'
import {Separator} from '@/components/ui/separator'

interface TagPageTemplateProps {
  data: {
    allMarkdownRemark: {
      totalCount: number
      edges: {
        node: {
          fields: {
            slug: string
          }
          frontmatter: {
            title: string
          }
        }
      }[]
    }
  }
  pageContext: {
    tag: string
  }
}

const TagPageTemplate: React.FC<TagPageTemplateProps> = (props) => {
  const {
    data: {
      allMarkdownRemark: {totalCount, edges: articles},
    },
    pageContext: {tag},
  } = props

  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with “${tag}”`

  return (
    <Layout>
      <div className="mx-auto w-full max-w-screen-md">
        <div className="px-3 md:px-0 py-3 md:py-5">
          <header>
            <TypographyH1># {tag}</TypographyH1>
            <div className="my-3">
              <TypographyLead>{tagHeader}</TypographyLead>
            </div>
          </header>

          <Separator />

          <section>
            {articles.map((article: any, idx: number) => {
              const articleTitle = article.node.frontmatter.title
              const slug = article.node.fields.slug

              return (
                <article
                  key={`${slug}-${idx}`}
                  className="py-6 border-b last:border-none"
                >
                  <TypographyH2>
                    <Link
                      className="hover:text-gray-500 transition-colors duration-100"
                      to={slug}
                    >
                      {articleTitle}
                    </Link>
                  </TypographyH2>
                </article>
              )
            })}
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default TagPageTemplate

export const tagQuery = graphql`
  query Tag($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: {frontmatter: {date: DESC}}
      filter: {frontmatter: {tags: {in: [$tag]}}}
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
