---
title: Making a marketing website using Gatsby Starter Business
description: Make an SEO friendly website, leveraging Gatsby Starter Business,
  perfect for your marketing needs like Sitemap, Schemas, OpenGraph, Meta Tags,
  GTM etc
pubDate: 2018-04-10T12:30:00.000Z
slug: making-a-marketing-website-using-gatsby-starter-business
author: vaibhav-sharma
cover: src/assets/media/gatsby_marketing_website.jpg
tags:
  - javascript
  - marketing
  - gatsby js
  - react js
  - SEO
---
**NOTE:** Updated for ***gatsby-starter-business v2.1***

Gatsby JS brought something that everyone was waiting for, a React JS based static site generator, and that too a powerful one. True to their boast that it's really hard to make a sloppy website with Gatsby, making it amazing for marketing websites.

When I was writing a website for my company, I found my self wanting a Gatsby starter with the following requirements:

* It should be powered by *Netlify* CMS.
* It should be SEO friendly.
* It should at least have a home page and blog page.
* It should allow proper styling using some CSS framework like *Bootstrap* or *Bulma*.

While all these features are available in various starters, none of them was a complete package. So, I decided I'll make one myself:

[gatsby-starter-business](https://github.com/v4iv/gatsby-starter-business)

## Starting a new Gatsby Project

Assuming you already have Gatsby CLI installed, to start a new Gatsby JS Project using Gatsby-Starter-Business, open your terminal and run this:

```shell
gatsby new <your_project_name> https://github.com/v4iv/gatsby-starter-business
```

This will create a clone of Gatsby Starter Business, with project name you gave earlier.

## Get Started With Gatsby Starter Business

To configure Gatsby Starter Business, open `config.js` file. Change the required variables and save it. And push it to a new repository in your Github.

```javascript
module.exports = {
  siteTitle: 'Gatsby Starter Business', // Site title.
  siteTitleAlt: 'Business', // Alternative site title for SEO.
  siteLogo: '/icons/icon-512x512.png', // Logo used for SEO and manifest.
  siteUrl: 'https://gatsby-starter-business.netlify.com', // Domain of your website without pathPrefix.
  // Do not use trailing slash!
  pathPrefix: '/', // Prefixes all links. For cases when deployed to example.github.io/gatsby-starter-business/.
  siteDescription: 'Leverage Gatsby Business Starter for your Business.', // Website description used for RSS feeds/meta description tag.
  siteRss: '/rss.xml',
  siteFBAppID: '', // FB Application ID for using app insights
  googleTagManagerID: '', // GTM tracking ID.
  disqusShortname: 'gatsby-business-starter', // Disqus shortname.
  userName: 'Vaibhav Sharma',
  userTwitter: 'vaibhaved',
  userLocation: 'Delhi NCR, India',
  userDescription: '',
  copyright: 'Copyright © Gatsby Starter Business 2018. All Rights Reserved.', // Copyright string for the footer of the website and RSS feed.
  themeColor: '#00d1b2', // Used for setting manifest and progress theme colors.
  backgroundColor: '#ffffff', // Used for setting manifest background color.
}
```

Then from Netlify dashboard create a new site from Github for the same repository, and deploy it.

Once done go to Netlify settings page, and enable Identity, set registration preference and Git Gateway. Create a user from the identity tab of Netlify and visit <https://yoursiteaddress/admin/#/> login with your Netlify credentials and you'll be on the admin page. Now you can easily edit pages or add new blog articles.
