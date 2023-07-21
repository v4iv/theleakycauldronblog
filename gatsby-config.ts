import dotenv from 'dotenv'
dotenv.config({path: `.env.${process.env.NODE_ENV}`})
import * as path from 'path'
import type {GatsbyConfig} from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: `The Leaky Cauldron Blog`,
    description: `A Brew of Awesomeness with a Pinch of Magic...`,
    siteUrl: `https://theleakycauldronblog.com`,
    image: `/icons/icon-512.png`,
    social: {
      twitter: `@waybove`,
    },
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
          `gatsby-remark-embedder`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-twitter`,
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
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: '#ffa3d7',
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: process.env.DISQUS_SHORTNAME,
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GTM_ID,
        includeInDevelopment: false,
        enableWebVitalsTracking: true,
        defaultDataLayer: {platform: 'gatsby'},
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [`/tags`, `/tags/*`],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `the leaky cauldron blog`,
        short_name: `tlcb`,
        start_url: '/',
        background_color: `#ffffff`,
        theme_color: `#0f172a`, // TODO #020817
        display: `standalone`,
        icons: [
          {
            src: `/icons/icon-192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/icons/icon-512.png`,
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
        name: `pages`,
        engine: `lunr`,
        engineOptions: `speed`,
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
                  templateKey
                }
                rawMarkdownBody
              }
            }
          }
        `,
        ref: `id`,
        index: [`slug`, `title`, `body`, `author`, `templateKey`],
        store: [`id`, `slug`, `title`, `author`, `templateKey`],
        normalizer: ({
          data,
        }: {
          data: {
            allMarkdownRemark: {
              nodes: {
                rawMarkdownBody: string
                id: string
                fields: {
                  slug: string
                }
                frontmatter: {
                  title: string
                  author: string
                  templateKey: string
                }
              }[]
            }
          }
        }) =>
          data.allMarkdownRemark.nodes
            .filter(
              (node: {
                frontmatter: {
                  templateKey: string
                }
              }) => node.frontmatter.templateKey === 'article-page',
            )
            .map(
              (node: {
                rawMarkdownBody: string
                id: string
                fields: {
                  slug: string
                }
                frontmatter: {
                  title: string
                  author: string
                  templateKey: string
                }
              }) => ({
                id: node.id,
                slug: node.fields.slug,
                title: node.frontmatter.title,
                body: node.rawMarkdownBody,
                author: node.frontmatter.author,
                templateKey: node.frontmatter.templateKey,
              }),
            ),
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            output: `/rss.xml`,
            title: `The Leaky Cauldron Blog RSS Feed`,
            serialize: ({
              query: {site, allMarkdownRemark},
            }: {
              query: {
                site: {
                  siteMetadata: {
                    siteUrl: string
                  }
                }
                allMarkdownRemark: {
                  nodes: {
                    excerpt: string
                    html: string
                    id: string
                    fields: {
                      slug: string
                    }
                    frontmatter: {
                      title: string
                      author: string
                      date: string
                      templateKey: string
                    }
                  }[]
                }
              }
            }) => {
              return allMarkdownRemark.nodes
                .filter(
                  (node) => node.frontmatter.templateKey === 'article-page',
                )
                .map((node) => {
                  return Object.assign({}, node.frontmatter, {
                    title: node.frontmatter.title,
                    description: node.excerpt,
                    author: node.frontmatter.author,
                    date: node.frontmatter.date,
                    url: site.siteMetadata.siteUrl + node.fields.slug,
                    guid: site.siteMetadata.siteUrl + node.fields.slug,
                    custom_elements: [{'content:encoded': node.html}],
                  })
                })
            },
            query: `
            {
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt(pruneLength: 400)
                  html
                  id
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    author
                    date
                    templateKey
                  }
                }
              }
            }
            `,
          },
        ],
      },
    },
    `gatsby-plugin-use-query-params`,
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        mergeSecurityHeaders: false,
        headers: {
          '/*.js': ['cache-control: public, max-age=31536000, immutable'],
          '/*.css': ['cache-control: public, max-age=31536000, immutable'],
          '/sw.js': ['cache-control: public, max-age=0, must-revalidate'],
          '/*': [
            `X-Frame-Options: DENY`,
            `X-XSS-Protection: 1; mode=block`,
            `X-Content-Type-Options: nosniff`,
            `Referrer-Policy: no-referrer-when-downgrade`,
          ],
        },
      },
    },
    `gatsby-plugin-remove-serviceworker`,
    // `gatsby-plugin-perf-budgets`,
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
  ],
}

export default config
