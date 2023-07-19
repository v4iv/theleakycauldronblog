import * as path from 'path'
import type {GatsbyConfig} from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: `The Leaky Cauldron Blog`,
    siteUrl: `https://theleakycauldronblog.com`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `static`, `img`),
        name: `uploads`,
      },
      __key: `uploads`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `static`, `img`),
        name: `images'`,
      },
      __key: `images`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: path.join(__dirname, `src`, `pages`),
      },
      __key: `pages`,
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              name: `uploads`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1024,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbersGlobal: false,
              noInlineHighlight: true,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: path.join(__dirname, `src`, `cms`, `cms.ts`),
        enableIdentityWidget: true,
        htmlTitle: `CMS | The Leaky Cauldron Blog`,
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [`/tags`, `/tags/*`],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The Leaky Cauldron Blog`,
        short_name: `TLC Blog`,
        start_url: '/',
        background_color: `#ffffff`,
        theme_color: `#676767`,
        display: `standalone`,
        icons: [
          {
            src: `/icons/icon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/icons/icon-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
        cache_busting_mode: `none`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-local-search`,
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: `pages`,

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: `flexsearch`,

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        engineOptions: `speed`,

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
          {
            allMarkdownRemark {
              nodes {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  author
                  metaTitle
                  metaDescription
                  templateKey
                }
                rawMarkdownBody
              }
            }
          }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: `id`,

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: [
          `slug`,
          `title`,
          `body`,
          `author`,
          `metaTitle`,
          `metaDescription`,
          `templateKey`,
        ],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: [`id`, `slug`, `title`, `templateKey`],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({data}: any) =>
          data.allMarkdownRemark.nodes.map((node: any) => ({
            id: node.id,
            slug: node.fields.slug,
            title: node.frontmatter.title,
            body: node.rawMarkdownBody,
            author: node.frontmatter.author,
            metaTitle: node.frontmatter.metaTitle,
            metaDescription: node.frontmatter.metaDescription,
            templateKey: node.frontmatter.templateKey,
          })),
      },
    },
  ],
}

export default config
