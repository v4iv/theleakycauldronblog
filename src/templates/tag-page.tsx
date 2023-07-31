import React from 'react'
import {HeadProps, Link, PageProps, graphql} from 'gatsby'
import {useTranslation} from 'gatsby-plugin-react-i18next'
import {Hash} from 'lucide-react'
import {
  TypographyH1,
  TypographyH2,
  TypographyLead,
} from '@/components/ui/typography'
import {Separator} from '@/components/ui/separator'
import {useSiteMetadata} from '@/hooks/useSiteMetadata'
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
  const {t} = useTranslation('common')

  return (
    <Layout>
      <div className="mx-auto w-full max-w-screen-md">
        <div className="p-3 md:px-0 md:py-5">
          <header className="space-y-3">
            <TypographyH1>
              <span className="flex items-end">
                <Hash className="mr-1 h-11 w-11" />
                {tag}
              </span>
            </TypographyH1>

            <TypographyLead>
              {t('tag-subtitle', {count: totalCount, tag: tag})}
            </TypographyLead>

            <Separator />
          </header>

          <section>
            {articles.map((article: any, idx: number) => {
              const articleTitle = article.node.frontmatter.title
              const slug = article.node.fields.slug

              return (
                <article
                  key={`${slug}-${idx}`}
                  className="border-b py-6 last:border-none"
                >
                  <TypographyH2>
                    <Link className="hover:text-muted-foreground" to={slug}>
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
  const {title} = useSiteMetadata()

  const aboutTag = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with “${tag}”`

  return (
    <SEO
      pathname={pathname}
      title={`${aboutTag} | ${title}`}
      description={aboutTag}
    />
  )
}

export const tagQuery = graphql`
  query Tag($tag: String, $language: String!) {
    locales: allLocale(
      filter: {ns: {in: ["common"]}, language: {eq: $language}}
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
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
