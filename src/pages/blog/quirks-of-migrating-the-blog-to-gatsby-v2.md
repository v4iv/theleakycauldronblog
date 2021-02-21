---
templateKey: article-page
title: Quirks of migrating the blog to Gatsby v2
slug: quirks-of-migrating-the-blog-to-gatsby-v2
author: Vaibhav Sharma
authorLink: https://twitter.com/vaibhaved
date: 2018-12-03T12:47:42.410Z
cover: /img/everything_is_connected.gif
metaTitle: Quirks of migrating the blog to Gatsby v2 and how to deal with them.
metaDescription: >-
  Dealing with the struggles and features of migrating to Gatsby v2. From
  handling broken dependencies to dealing with unexpected broken features to
  utilising new features of Gatsby v2.
tags:
  - migration
  - gatsby js
  - react js
  - javascript
---
When the Gatsby v2 dropped I was like do I really need this, my website is already faster than anything on Gatsby v1? But then I remembered I made this website more so because I wanted to try Gatsby than anything else. Finally, I took time out to do it last weekend.

# Journey Begins - Updating Dependencies

Upgrading `npm` packages broke so much because a lot of them now require _peerDependencies_ which were earlier part of the package itself. And some packages had dependencies included in them. This task had one upside to it - I cleaned up a lot of packages that weren't that useful and wanted to remove but never got time to. This also got me thinking about including new packages and features that I wanted to, most of all - ElasticLunr Search. The real struggles soon follow.

# I See Red - Warnings and Deprecations

With new release, comes lots of deprecations:

## Link is now included in gatsby package

Although migration from `react-router` to `reach/router` was a great decision, it meant manually updating the imports in a lot of files. Nevertheless, a good decision as I felt there was a lot of inconsistency with `react-router` especially in terms of gatsby, even though it was a more familiar package to work with due to my experience with React.

## Global graphql is now deprecated

This one was more of a surprise to me as it made not much sense, but still meant a lot of refactoring. What I thought would make it easy was Webstorm auto-import but that didn't go quite well for me, had to do it manually. Only to find out that there is a codemod package to help it!

## Renaming parameters

`boundActionCreators` and `pathContext` were retired to make way for `actions` and `pageContext`. This was easy enough to do with Webstorm. Phew!

## Removing inline styles from `html.js`

Although Gatsby v2 doc states that we should stay away from html.js but, my project is set up in a way that I didn't/couldn't stay away from it(thanks `Bulma`). And this also meant additional refactoring.

## Adding the support for Layout

This one had me most wary, I was like this cannot go well on the first try, but voila it did. But wait a second, there was a problem that I didn't know yet.

# Problems Begin - Solving Breaking Changes

Just when I was thinking this going all too well, I encountered my first glitch - The Netlify CMS isn't accessible anymore.

## `gatsby-plugin-layout` breaks Netlify CMS Admin Page

This was a particularly nasty problem because it looks like `gatsby-plugin-layout` is trying to put the layout on the admin page and you don't see any way to fix it! ...but, it doesn't have much to do with it. After googling for hours and asking random devs online, I remembered I had another project where it didn't break the admin page. Solution? All you need to do is that you need to put `gatsby-plugin-layout` before `gatsby-plugin-netlify-cms` in `gatsby-config.js`.

## Netlify CMS Preview Pane stops working.

This one although was easy to figure out using Console errors, was still surprising because it made no sense why it had worked before and if it did, it made no sense that it is now broken! The problem was that the tags needed an error check:

```javascript
 {tags && tags.length ? (...) : null}
```

Luckily this is where my problems ended with the migrations. Now, it was time for improving the blog, by adding search functionality.

# Improvement Begins - Adding Search Functionality.

I know this doesn't seem like much of a reason to include it in this blog, but I included this because I wanted to discuss how freakin' StaticQuery is! It was always in the plans to include a Search Box, and had planned to use `@andrew-codes/gatsby-plugin-elasticlunr-search` since I had no plans to use Algolia. I could still use `andrew-codes` version but i decided to use the forked version by `gatsby-contrib`, because I wanted to try out StaticQuery. And let me tell ya, it's a damn cool feature!

And with that migration was finally complete! It was not too bad, for javascript ecosystem. And the effort was worth the result.
