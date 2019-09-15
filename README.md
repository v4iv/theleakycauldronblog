[![Netlify Status](https://api.netlify.com/api/v1/badges/e87569d9-1f7b-4ca2-941b-6d5081d976c1/deploy-status)](https://app.netlify.com/sites/theleakycauldronblog/deploys)

# Gatsby Starter Blog Tachyons

A truly complete & feature rich Gatsby Blog Starter. Powered by Gatsby and Netlify CMS.

## Getting Started
Create your own project with Gatsby CLI:

```shell
gatsby new myblogname https://github.com/v4iv/theleakycauldronblog.git 
```

## Features

* Elastic-Lunr Search
* Pagination
* SEO Friendly(Sitemap, Schemas, Robots.txt, Meta Tags, GTM etc.)
* Disqus and Share Support
* Tags and RSS Feed
* Progressive Web App with Offline Support
* Easy Configuration using `config.js` file
* Tachyons and Sass Support for styling
* Medium like progressive image loading
* Code Higlighting with Prism JS
* Contact From using Netlify Forms, Formik & Yup

## Available NPM Commands

### Develop

Start a hot-reloading development environment accessible at `localhost:8000`

```shell
yarn start
```

### Build

Get an optimized production build for your site generating static HTML and per-route JavaScript code bundles.

```shell
yarn build
```

### Serve

gatsby serve — Gatsby starts a local HTML server for testing your built site.

```shell
yarn serve
```

### Lint

Lint the code according to eslintrc file, for consistency.

```shell
yarn lint
```

### Lint Fix

Auto fix Lint issues.

```shell
yarn lint:fix
```

### Clean

Remove the .cache and public for a scratch compile.

```shell
yarn clean
```

## Configuration (Very Important!)

To personalize and configure this Starter open `config.js` file and replace the default values.

```javascript
module.exports = {
  siteTitle: 'The Leaky Cauldron Blog', // Site title.
  siteTitleAlt: 'TLC Blog', // Alternative site title for SEO.
  siteLogo: '/logos/logo-512x512.png', // Logo used for SEO and manifest.
  siteUrl: 'https://theleakycauldronblog.com', // Domain of your website without pathPrefix.
  pathPrefix: '', // Prefixes all links. For cases when deployed to example.github.io/gatsby-starter-business/.
  siteDescription: 'A Brew of Awesomeness with a Pinch of Magic...', // Website description used for RSS feeds/meta description tag.
  siteRss: '/rss.xml',
  googleTagManagerID: process.env.GTM_ID || '', // GTM tracking ID.
  disqusShortname: 'https-theleakycauldronblog-com', // Disqus shortname.
  userName: 'Vaibhav Sharma',
  userTwitter: 'vaibhaved',
  userLocation: 'Delhi NCR, India',
  userDescription: '',
  copyright: 'Copyright © The Leaky Cauldron Blog 2019. All Rights Reserved.', // Copyright string for the footer of the website and RSS feed.
  themeColor: '#676767', // Used for setting manifest and progress theme colors.
  backgroundColor: '#ffffff', // Used for setting manifest background color.
}
```

<a href="https://www.netlify.com">
  <img src="https://www.netlify.com/img/global/badges/netlify-dark.svg"/>
</a>
