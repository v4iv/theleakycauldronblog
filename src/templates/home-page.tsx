import React from 'react'
import {HeadProps, Link, PageProps, graphql} from 'gatsby'
import {useTranslation} from 'gatsby-plugin-react-i18next'
import {ArrowLeft, ArrowRight} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {useSiteMetadata} from '@/hooks/useSiteMetadata'
import SEO from '@/components/SEO'
import Layout from '@/components/Layout'
import ArticleList from '@/components/ArticleList'

type DataProps = {
  allMarkdownRemark: {
    edges: {
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
          date: any
          tags: string[]
          templateKey: string
        }
      }
    }[]
  }
}

type PageContextProps = {
  currentPage: number
  numberOfPages: number
}

function HomePageTemplate({
  data: {
    allMarkdownRemark: {edges: pages},
  },
  pageContext: {currentPage, numberOfPages},
}: PageProps<DataProps, PageContextProps>) {
  const {t} = useTranslation('common')

  const isFirst = currentPage === 1
  const isLast = currentPage === numberOfPages

  const prevPage =
    currentPage - 1 === 1 ? '/' : `/${(currentPage - 1).toString()}`
  const nextPage = `/${(currentPage + 1).toString()}`

  const posts = pages.filter(
    (page) => page?.node?.frontmatter?.templateKey === 'article-page',
  )

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="grow">
          <ArticleList posts={posts} />
        </div>

        <div className="mx-auto flex w-full max-w-screen-md justify-evenly pb-9 pt-5 align-middle font-mono">
          {!isFirst && (
            <Button asChild>
              <Link to={prevPage} rel="prev">
                <ArrowLeft className="mr-2 size-4" />
                &nbsp;{t('prev')}
              </Link>
            </Button>
          )}

          {!isLast && (
            <Button asChild>
              <Link to={nextPage} rel="next">
                {t('next')}&nbsp;
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default HomePageTemplate

export function Head({
  location: {pathname},
}: HeadProps<DataProps, PageContextProps>) {
  const {title, siteUrl} = useSiteMetadata()

  const websiteSchemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    name: title,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <SEO pathname={pathname}>
      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchemaOrgJSONLD)}
      </script>
    </SEO>
  )
}

export const articleListQuery = graphql`
  query ArticleList($skip: Int!, $limit: Int!, $language: String!) {
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
      sort: {frontmatter: {date: DESC}}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(format: PLAIN, pruneLength: 150)
          fields {
            slug
          }
          frontmatter {
            title
            cover {
              childImageSharp {
                gatsbyImageData(
                  width: 400
                  quality: 75
                  placeholder: BLURRED
                  formats: [AUTO, AVIF, WEBP]
                )
              }
              publicURL
            }
            author
            date(formatString: "MMMM DD, YYYY")
            tags
            templateKey
          }
        }
      }
    }
  }
`
