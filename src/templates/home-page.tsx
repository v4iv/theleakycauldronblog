import * as React from 'react'
import {Link, graphql} from 'gatsby'
import {ArrowLeft, ArrowRight} from 'lucide-react'
import {Button} from '@/components/ui/button'
import Layout from '@/components/Layout'
import ArticleList from '@/components/ArticleList'

interface HomePageTemplateProps {
  data: {
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
  pageContext: {
    currentPage: number
    numberOfPages: number
  }
}

const HomePageTemplate: React.FC<HomePageTemplateProps> = (props) => {
  const {
    data: {
      allMarkdownRemark: {edges: pages},
    },
    pageContext: {currentPage, numberOfPages},
  } = props

  const isFirst = currentPage === 1
  const isLast = currentPage === numberOfPages
  const prevPage =
    currentPage - 1 === 1 ? '/' : `/${(currentPage - 1).toString()}`
  const nextPage = `/${(currentPage + 1).toString()}`

  return (
    <Layout>
      <ArticleList pages={pages} />

      {!isFirst && (
        <Button asChild>
          <Link to={prevPage} rel="prev">
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous Page
          </Link>
        </Button>
      )}
      {!isLast && (
        <Button asChild>
          <Link to={nextPage} rel="next">
            Next Page <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
    </Layout>
  )
}

export default HomePageTemplate

export const articleListQuery = graphql`
  query ArticleList($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: {frontmatter: {date: DESC}}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            cover {
              childImageSharp {
                gatsbyImageData(
                  quality: 72
                  placeholder: BLURRED
                  layout: FULL_WIDTH
                )
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
