import dotenv from 'dotenv'
import * as path from 'path'
import type {GatsbyConfig} from 'gatsby'

dotenv.config({path: `.env.${process.env.NODE_ENV}`})

const siteMetadata = {
  title: `The Leaky Cauldron Blog`,
  description: `A Brew of Awesomeness with a Pinch of Magic...`,
  shortName: `tlcb`,
  siteUrl: `https://theleakycauldronblog.com`,
  image: `/icons/icon-512.png`,
  social: {
    twitter: `@waybove`,
  },
}

const config: GatsbyConfig = {
  siteMetadata,
  partytownProxiedURLs: [
    `https://www.googletagmanager.com/gtm.js?id=${process.env.GATSBY_GTM_ID}`,
    `https://www.google-analytics.com/analytics.js`,
  ],
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`,
      },
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
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: `_blank`,
              rel: 'nofollow',
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
        htmlTitle: `CMS | ${siteMetadata.title}`,
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
        shortname: process.env.GATSBY_DISQUS_SHORTNAME,
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-tagmanager`,
    //   options: {
    //     id: process.env.GATSBY_GTM_ID,
    //     includeInDevelopment: false,
    //     enableWebVitalsTracking: true,
    //     defaultDataLayer: {platform: 'gatsby'},
    //   },
    // },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [`/tags/*`],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.shortName,
        start_url: '/',
        background_color: `#ffffff`,
        theme_color: `#020817`,
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
          {
            src: `/icons/icon-192-maskable.png`,
            sizes: `192x192`,
            type: `image/png`,
            purpose: 'any maskable',
          },
          {
            src: `/icons/icon-512-maskable.png`,
            sizes: `512x512`,
            type: `image/png`,
            purpose: 'any maskable',
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
            title: `${siteMetadata.title} RSS Feed`,
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
                  let html = node.html
                  // Hacky workaround for replacing relative paths taken from overreacted.io https://github.com/gaearon/overreacted.io
                  html = html
                    .replace(/href="\//g, `href="${site.siteMetadata.siteUrl}/`)
                    .replace(/src="\//g, `src="${site.siteMetadata.siteUrl}/`)
                    .replace(
                      /"\/static\//g,
                      `"${site.siteMetadata.siteUrl}/static/`,
                    )
                    .replace(
                      /,\s*\/static\//g,
                      `,${site.siteMetadata.siteUrl}/static/`,
                    )

                  return Object.assign({}, node.frontmatter, {
                    title: node.frontmatter.title,
                    description: node.excerpt,
                    date: node.frontmatter.date,
                    url: site.siteMetadata.siteUrl + node.fields.slug,
                    guid: site.siteMetadata.siteUrl + node.fields.slug,
                    custom_elements: [{'content:encoded': html}],
                  })
                })
            },
            query: `
            {
              allMarkdownRemark(limit: 1000, sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt(pruneLength: 400)
                  html
                  id
                  fields {
                    slug
                  }
                  frontmatter {
                    title
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
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        languages: [`en`],
        defaultLanguage: `en`,
        siteUrl: siteMetadata.siteUrl,
        trailingSlash: `always`,
        i18nextOptions: {
          defaultNS: `common`,
          debug: !!(process.env.NODE_ENV === 'development'),
          lowerCaseLng: true,
          saveMissing: false,
          interpolation: {
            escapeValue: false,
          },
        },
      },
    },
    `gatsby-plugin-use-query-params`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-remove-serviceworker`,
    // `gatsby-plugin-perf-budgets`,
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
  ],
}

export default config
