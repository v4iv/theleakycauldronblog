const _ = require('lodash')
const path = require('path')
const pathPrefix = require('./config').pathPrefix
const createPaginatedPages = require('gatsby-paginate')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  let slug

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`
    } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
    } else if (parsedFilePath.dir === '') {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug') && Object.prototype.hasOwnProperty.call(node.frontmatter, 'cover')) { slug = `/blog/${_.kebabCase(node.frontmatter.slug)}` } else if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')) {
        slug = `/${_.kebabCase(node.frontmatter.slug)}`
      }
    }

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`{
  allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
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
`).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const allNodes = result.data.allMarkdownRemark.edges

    // Post pages:
    let posts = []
    // Iterate through each post/page, putting all found posts (where templateKey = article-page) into `posts`
    allNodes.forEach(edge => {
      if (_.isMatch(edge.node.frontmatter, { templateKey: 'article-page' })) {
        posts = posts.concat(edge)
      }
    })

    createPaginatedPages({
      edges: posts,
      createPage: createPage,
      pageTemplate: 'src/templates/home-page.js',
      pageLength: 6, // This is optional and defaults to 10 if not used
      pathPrefix: pathPrefix, // This is optional and defaults to an empty string if not used
      context: {}, // This is optional and defaults to an empty object if not used
    })

    allNodes.forEach((edge, index) => {
      const id = edge.node.id
      const nextID = index + 1 < allNodes.length ? index + 1 : 0
      const prevID = index - 1 >= 0 ? index - 1 : allNodes.length - 1
      const nextEdge = allNodes[nextID]
      const prevEdge = allNodes[prevID]

      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`,
        ),

        // additional data can be passed via context
        context: {
          id: id,
          slug: edge.node.fields.slug,
          nexttitle: nextEdge.node.frontmatter.title,
          nextslug: nextEdge.node.fields.slug,
          prevtitle: prevEdge.node.frontmatter.title,
          prevslug: prevEdge.node.fields.slug,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}
