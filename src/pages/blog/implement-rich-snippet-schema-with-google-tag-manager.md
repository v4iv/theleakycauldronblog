---
templateKey: article-page
title: Implement Rich Snippet Schema with Google Tag Manager
date: '2018-06-11T15:51:54+05:30'
cover: /img/schema_gtm.png
tags:
  - Schema
  - RichSnippet
  - SEO
  - GoogleTagManager
  - JSONLD
meta_title: Implement Rich Snippet JSON LD Schema with Google Tag Manager
meta_description: >-
  Leverage Google Tag Manager Custom HTML Tag to implement Schema.org JSON-LD
  Schema for Rich Snippets.
---
Rich Snippets Schema, while may not help in improving SERP Ranking, it does help in better CTR(Click Through Rate). And this is the new frontier in Digital Marketing/SEO. With onset of various AI Assistants like _Google Assistant_, _Siri_, _Cortana_ etc and them affecting sales, It has become very important that the search engines understand your content better. To make them understand content better, a lot of search giants got together and developed a content markup system. This is Project _**Schema.org**_.

There are various encodings you can use to markup your data, like `Microdata`, `JSON-LD`, `RDFa`. But out of these the popular choices are `Microdata` and `JSON-LD`. `Microdata` is very much like `XML` where as `JSON-LD` is more like `JSON`. Google prefers `JSON-LD` and plans to phase out `Microdata`. But `Microdata` is still big part of Bing and Yahoo.

Although there are various ways you can implement these Schemas, the one that has been gaining a lot of traction recently is using _Google Tag Manager_. While you can simply put your JSON-LD schema Tag in a Custom HTML field and expect it to work, and for some people it has, if you go to [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool/) you'll find out that the schema isn't visible. That's either because Structured Data Testing Tool cannot render the schema, or GTM doesn't allow us to do so.

This made us think and we found a simple workaround for this problem.
