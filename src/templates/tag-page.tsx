import * as React from 'react'
import {HeadProps, Link, PageProps, graphql} from 'gatsby'
import {
  TypographyH1,
  TypographyH2,
  TypographyLead,
} from '@/components/ui/typography'
import {Separator} from '@/components/ui/separator'
import SEO from '@/components/SEO'
import Layout from '@/components/Layout'

type DataProps = {
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

type PageContextProps = {
  tag: string
}

function TagPageTemplate({
  data: {
    allMarkdownRemark: {totalCount, edges: articles},
  },
  pageContext: {tag},
}: PageProps<DataProps, PageContextProps>) {
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with “${tag}”`

  return (
    <Layout>
      <div className="mx-auto w-full max-w-screen-md">
        <div className="px-3 md:px-0 py-3 md:py-5">
          <header className="space-y-3">
            <TypographyH1># {tag}</TypographyH1>

            <TypographyLead>{tagHeader}</TypographyLead>

            <Separator />
          </header>

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

export function Head({
  location: {pathname},
  data: {
    allMarkdownRemark: {totalCount},
  },
  pageContext: {tag},
}: HeadProps<DataProps, PageContextProps>) {
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with “${tag}”`

  return <SEO pathname={pathname} title={tag} description={tagHeader} />
}

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
