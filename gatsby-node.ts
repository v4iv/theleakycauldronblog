import * as path from 'path'
import slugify from 'slugify'
import webpack from 'webpack'
import type {CreateNodeArgs, GatsbyNode} from 'gatsby'
import {createFilePath} from 'gatsby-source-filesystem'

interface MarkdownRemarkNode extends CreateNodeArgs {
  [key: string]: unknown
  internal: {
    type: 'MarkdownRemark'
  }
  frontmatter?: {
    templateKey?: string
    slug?: string
  }
}

interface IEdge {
  node: {
    id: string
    fields: {
      slug: string
    }
    frontmatter?: {
      tags?: string[]
      date?: string
      templateKey?: string
    }
  }
}

interface IQueryResult {
  data?: {
    allMarkdownRemark: {
      excerpt: string
      id: string
      fields: {
        slug: string
      }
      edges: IEdge[]
    }
  }
  errors?: any[]
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  actions,
  getNode,
  node,
}: CreateNodeArgs<MarkdownRemarkNode>) => {
  const {createNodeField} = actions

  if (node.internal.type === `MarkdownRemark`) {
    let slug

    if (node.frontmatter?.templateKey === 'article-page') {
      const s: string = node.frontmatter?.slug || ''

      slug = `/blog/${slugify(s)}`
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
  reporter,
}) => {
  const {
    createPage,
    // createSlice
  } = actions

  const response: any = await graphql<IQueryResult>(`
    query TheLeakyCauldronBlog {
      allMarkdownRemark(sort: [{frontmatter: {date: DESC}}]) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `)

  if (response.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)

    return Promise.reject(response.errors)
  }

  const allNodes = response?.data.allMarkdownRemark.edges

  let articles: IEdge[] = []

  allNodes.forEach((edge: IEdge) => {
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

  allNodes.forEach((edge: IEdge, idx: number) => {
    const id = edge.node.id
    const prev = idx === allNodes.length - 1 ? null : allNodes[idx + 1].node
    const next = idx === 0 ? null : allNodes[idx - 1].node

    createPage({
      path: edge.node.fields.slug,
      component: path.resolve(
        `src/templates/${String(edge?.node?.frontmatter?.templateKey)}.tsx`,
      ),
      context: {
        id: id,
        prev,
        next,
      },
    })
  })

  let tags: string[] = []

  articles.forEach((edge: IEdge) => {
    if (edge?.node?.frontmatter?.tags) {
      tags = tags.concat(edge.node.frontmatter.tags)
    }
  })

  tags = [...new Set(tags)]

  tags.forEach((tag: string) => {
    const tagPath = `/tags/${slugify(tag)}`

    createPage({
      path: tagPath,
      component: path.resolve(`src/templates/tag-page.tsx`),
      context: {
        tag,
      },
    })
  })

  // removed slices because it doesn't play well with i18next and causes hydration diff
  // Navbar Slice
  // createSlice({
  //   id: `navbar`,
  //   component: path.resolve(`./src/components/NavBar/index.tsx`),
  // })

  // Footer Slice
  // createSlice({
  //   id: `footer`,
  //   component: path.resolve(`./src/components/Footer/index.tsx`),
  // })
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({actions}) => {
    actions.createTypes(`
    type Site {
      siteMetadata: SiteMetadata!
    }
    
    type SiteMetadata {
      title: String!
      description: String!
      shortName: String!
      siteUrl: String!
      image: String!
      social: Social!
    }

    type Social {
      twitter: String!
    }
  `)
  }

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^netlify-identity-widget$/,
      }),
    ],
    resolve: {
      alias: {
        '@/lib': path.resolve(__dirname, 'src/lib'),
        '@/hooks': path.resolve(__dirname, 'src/hooks'),
        '@/components': path.resolve(__dirname, 'src/components'),
        '@/components/ui': path.resolve(__dirname, 'src/components/ui'),
      },
    },
  })
}
