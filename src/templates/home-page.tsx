import * as React from 'react'
import {Link, graphql} from 'gatsby'
import Layout from '@/components/Layout'
import ArticleList from '@/components/ArticleList'
import {Button} from '@/components/ui/button'

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
            tags: string[]
            date: any
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
      allMarkdownRemark: {edges: articles},
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
      <ArticleList articles={articles} />

      {!isFirst && (
        <Button asChild>
          <Link to={prevPage} rel="prev">
            ← Previous Page
          </Link>
        </Button>
      )}
      {!isLast && (
        <Button asChild>
          <Link to={nextPage} rel="next">
            Next Page →
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
            tags
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
