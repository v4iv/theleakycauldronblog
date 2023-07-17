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
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1024,
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
  ],
}

export default config
