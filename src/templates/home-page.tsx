import * as React from 'react'
import {HeadProps, Link, PageProps, graphql} from 'gatsby'
import {ArrowLeft, ArrowRight} from 'lucide-react'
import {Button} from '@/components/ui/button'
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
  const isFirst = currentPage === 1
  const isLast = currentPage === numberOfPages
  const prevPage =
    currentPage - 1 === 1 ? '/' : `/${(currentPage - 1).toString()}`
  const nextPage = `/${(currentPage + 1).toString()}`

  return (
    <Layout>
      <ArticleList pages={pages} />

      <div className="mx-auto w-full max-w-screen-md pt-5 pb-9 flex align-middle justify-evenly">
        {!isFirst && (
          <Button asChild>
            <Link to={prevPage} rel="prev">
              <ArrowLeft className="mr-2 h-4 w-4" />
              &nbsp;Prev
            </Link>
          </Button>
        )}
        {!isLast && (
          <Button asChild>
            <Link to={nextPage} rel="next">
              Next&nbsp;
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </Layout>
  )
}

export default HomePageTemplate

export function Head({
  location: {pathname},
}: HeadProps<DataProps, PageContextProps>) {
  return <SEO pathname={pathname} />
}

export const articleListQuery = graphql`
  query ArticleList($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: {frontmatter: {date: DESC}}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(format: PLAIN, pruneLength: 200)
          fields {
            slug
          }
          frontmatter {
            title
            cover {
              childImageSharp {
                gatsbyImageData(quality: 72, width: 400, placeholder: BLURRED)
              }
              publicURL
            }
            author
            date(formatString: "MMMM DD, YYYY")
            templateKey
          }
        }
      }
    }
  }
`