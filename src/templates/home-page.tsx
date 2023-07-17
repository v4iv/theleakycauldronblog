import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "@/components/Layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { TypographyH2, TypographyP } from "@/components/ui/typography"

interface HomePageTemplateProps {
  data: any
  pageContext: {
    currentPage: number
    numberOfPages: number
  }
}

const HomePageTemplate: React.FC<HomePageTemplateProps> = (props) => {
  const {
    data: {
      allMarkdownRemark: { edges: pages },
    },
    pageContext: { currentPage, numberOfPages },
  } = props

  const isFirst = currentPage === 1
  const isLast = currentPage === numberOfPages
  const prevPage =
    currentPage - 1 === 1 ? "/" : "/" + (currentPage - 1).toString()
  const nextPage = "/" + (currentPage + 1).toString()

  return (
    <Layout>
      {pages.map(({ node }: any, idx: number) => {
        const title = node.frontmatter.title
        const image = getImage(node.frontmatter.cover)!
        const slug = node.fields.slug
        const excerpt = node.excerpt

        return (
          <article key={idx}>
            <Link to={slug}>
              <TypographyH2>{title}</TypographyH2>
            </Link>
            <Link to={slug}>
              <GatsbyImage image={image} alt={title} />
            </Link>
            <TypographyP>{excerpt}</TypographyP>
          </article>
        )
      })}

      {!isFirst && (
        <Link to={prevPage} rel="prev">
          <TypographyP>← Previous Page</TypographyP>
        </Link>
      )}
      {!isLast && (
        <Link to={nextPage} rel="next">
          <TypographyP>Next Page →</TypographyP>
        </Link>
      )}
    </Layout>
  )
}

export default HomePageTemplate

export const articleListQuery = graphql`
  query articleListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
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
