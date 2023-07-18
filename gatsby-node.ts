import * as path from 'path'
import type {GatsbyNode} from 'gatsby'
import kebabCase from 'lodash.kebabcase'
import {createFilePath} from 'gatsby-source-filesystem'

// TODO typesafe
export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  actions,
  getNode,
  node,
}) => {
  const {createNodeField} = actions

  if (node.internal.type === `MarkdownRemark`) {
    let slug

    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      // @ts-ignore
      node?.frontmatter?.templateKey === 'article-page'
    ) {
      // @ts-ignore
      slug = `/blog/${kebabCase(node.frontmatter.slug)}`
    } else {
      slug = createFilePath({node, getNode})
    }

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
  }
}

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const {createPage} = actions

  const result: any = await graphql(`
    query TheLeakyCauldronBlog {
      allMarkdownRemark(sort: [{frontmatter: {date: DESC}}]) {
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

  allNodes.forEach((edge: any) => {
    if (edge?.node?.frontmatter?.templateKey === 'article-page') {
      articles = articles.concat(edge)
    }
  })

  const articlesPerPage = 6
  const numberOfPages = Math.ceil(articles.length / articlesPerPage)

  Array.from({length: numberOfPages}).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve(`src/templates/home-page.tsx`),
      context: {
        limit: articlesPerPage,
        skip: i * articlesPerPage,
        numberOfPages,
        currentPage: i + 1,
      },
    })
  })

  allNodes.forEach((edge: any) => {
    const id = edge.node.id

    createPage({
      path: edge.node.fields.slug,
      component: path.resolve(
        `src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`,
      ),

      context: {
        id: id,
      },
    })
  })

  let tags: any = []

  articles.forEach((edge: any) => {
    if (edge?.node?.frontmatter?.tags) {
      tags = tags.concat(edge.node.frontmatter.tags)
    }
  })

  tags = [...new Set(tags)]

  tags.forEach((tag: string) => {
    const tagPath = `/tags/${kebabCase(tag)}`

    createPage({
      path: tagPath,
      component: path.resolve(`src/templates/tag-page.tsx`),
      context: {
        tag,
      },
    })
  })
}

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@/components': path.resolve(__dirname, 'src/components'),
        '@/lib/utils': path.resolve(__dirname, 'src/lib/utils'),
      },
    },
  })
}
