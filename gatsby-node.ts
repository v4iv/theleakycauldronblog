import type { GatsbyNode } from "gatsby"
import * as path from "path"
import { createFilePath } from "gatsby-source-filesystem"

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  actions,
  getNode,
  node,
}) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions

  const result: any = await graphql(`
    {
      allMarkdownRemark(sort: [{ frontmatter: { date: DESC } }]) {
        edges {
          node {
            excerpt(pruneLength: 250)
            id
            fields {
              slug
            }
            frontmatter {
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
              title
              author
              tags
              date(formatString: "MMMM DD, YYYY")
              templateKey
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    result.errors.forEach((err: any) => console.error(err.toString()))

    return Promise.reject(result.errors)
  }
  const allNodes = result.data.allMarkdownRemark.edges

  let articles: any = []
  // Iterate through each page, putting all found posts (where templateKey = article-page) into `articles`
  allNodes.forEach((edge: any) => {
    if (edge?.node?.frontmatter?.templateKey === "article-page") {
      articles = articles.concat(edge)
    }
  })

  const articlesPerPage = 6
  const numberOfPages = Math.ceil(articles.length / articlesPerPage)

  Array.from({ length: numberOfPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve("./src/templates/home-page.tsx"),
      context: {
        limit: articlesPerPage,
        skip: i * articlesPerPage,
        numberOfPages,
        currentPage: i + 1,
      },
    })
  })
}

export const onCreateWebpackConfig = ({ actions }: any) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
      },
    },
  })
}
