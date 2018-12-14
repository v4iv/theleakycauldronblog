---
templateKey: article-page
title: Making a marketing website using Gatsby Starter Business
date: '2018-04-10T12:05:03+05:30'
cover: /img/gatsby_marketing_website.jpg
tags:
  - GatsbyJS
  - ReactJS
  - Gatsby Starter
  - Marketing
  - SEO
meta_title: Making a marketing website using Gatsby Starter Business
meta_description: >-
  Make an SEO friendly website, leveraging Gatsby Starter Business, perfect for
  your marketing needs like Sitemap, Schemas, OpenGraph, Meta Tags, GTM etc
---
Gatsby JS brought something that everyone was waiting for, a React JS based static site generator, and that too a powerful one. True to their boast that it's really hard to make sloppy website with Gatsby, making it amazing for marketing websites.

When I was writing a website for my company, i found my self wanting a Gatsby starter with following requirements:

* It should be powered by _Netlify_ CMS.
* It should be SEO friendly.
* It should at least have a home page and blog page.
* It should allow proper styling using some CSS framework like_ Bootstrap_ or _Bulma_.

While all these features are available in various starters, none of them were a complete package. So, I decided I'll make one myself:

[Gatsby-Starter-Business](https://github.com/v4iv/gatsby-starter-business)

## Starting a new Gatsby Project

Assuming you already have Gatsby CLI installed, to start a new Gatsby JS Project using Gatsby-Starter-Business, open your terminal and run this:

```bash
$ gatsby new <your_project_name> https://github.com/v4iv/gatsby-starter-business
```

This will create a clone of Gatsby Starter Business, with project name you gave earlier.

## Get Started With Gatsby Starter Business

To configure Gatsby Starter Business open `meta` folder and open `config.js` file. Change the required variables and save it. And push it to a new repository in your Github. Then from Netlify dashboard create a new site from github for the same repository, and deploy it. 

Once done go to Netlify settings page, and enable Identity, set registration preference and Git Gateway. Create a user from the identity tab of Netlify and visit <https://yoursiteaddress/admin/#/> login with your Netlify credentials and you'll be on the admin page. Now you can easily edit pages or add new blog articles.
