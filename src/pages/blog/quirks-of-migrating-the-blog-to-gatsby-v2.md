---
templateKey: article-page
title: Quirks of migrating the blog to Gatsby v2.
date: 2018-12-03T12:47:42.410Z
cover: /img/astronaut-v2.jpg
tags:
  - Migration
  - GatsbyJS
meta_title: Quirks of migrating the blog to Gatsby v2 and how to deal with them.
meta_description: >-
  Dealing with the struggles and features of migrating to Gatsby v2. From
  handling broken dependencies to dealing with unexpected broken features to
  utilising new features of Gatsby v2.
---
When the Gatsby v2 dropped I was like do I really need this, my website is already more fast than anything? But then I remembered I made this website more because I wanted to try Gatsby than anything else. Finally, I took time out to do it this last weekend.

# Journey Begins - Updating Dependencies

Upgrading `npm` packages broke so much because a lot of them now require _peerDependencies_ which were earlier part of the package itself. And some packages had dependencies included in them. This task had one upside to it - I cleaned up a lot of packages that weren't that useful and wanted to remove but never got time to. This also got me thinking about including new packages and features that I wanted to, most of all - ElasticLunr Search. The
