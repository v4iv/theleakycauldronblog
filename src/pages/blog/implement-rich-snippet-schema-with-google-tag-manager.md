---
templateKey: article-page
title: Implement Rich Snippet Schema with Google Tag Manager
slug: implement-rich-snippet-schema-with-google-tag-manager
author: Vaibhav Sharma
authorLink: https://twitter.com/vaibhaved
date: '2018-06-16T15:51:54+05:30'
cover: /img/structured_data_gtm.jpg
metaTitle: Implement Rich Snippet JSON LD Schema with Google Tag Manager
metaDescription: >-
  Leverage Google Tag Manager Custom HTML Tag to implement Schema.org JSON-LD
  Schema for Rich Snippets.
tags:
  - SEO
  - marketing
  - javascript
---
Rich Snippets Schema, while may not help in improving SERP Ranking, it does help in better CTR(Click Through Rate). And this is the new frontier in Digital Marketing/SEO. With the onset of various AI Assistants like _Google Assistant_, _Siri_, _Cortana_, etc and them affecting sales, It has become very important that the search engines understand your content better. To make them understand the content better, a lot of search giants got together and developed a content markup system. This is Project **_Schema.org_**.

There are various encodings you can use to markup your data, like `Microdata`, `JSON-LD`, `RDFa`. But out of these the popular choices are `Microdata` and `JSON-LD`. `Microdata` is very much like `XML` whereas `JSON-LD` is more like `JSON`. Google prefers `JSON-LD` and plans to phase out `Microdata`. But `Microdata` is still a big part of Bing and Yahoo.

Although there are various ways you can implement these Schemas, the one that has been gaining a lot of traction recently is using _Google Tag Manager_. While you can simply put your JSON-LD schema Tag in a Custom HTML field and expect it to work, and for some people it has, if you go to [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool/) you'll find out that the schema isn't visible. That's either because the Structured Data Testing Tool cannot render the schema, or GTM doesn't allow us to do so.

This made us think and we found a simple workaround for this problem. What we do essentially is, store schema data as `JSON` in a variable, and create a `<script type="application/ld+json"></script>` tag using JavaScript.

Let's say this is our `JSON-LD` Schema

```json
<script type="application/ld+json">
{
  "@context": "http://schema.org/",
  "@type": "Review",
  "url": "https://www.example.com/lorem-services/",
  "name": "Example Lorem Service Review",
  "reviewBody": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.",
  "datePublished": "2017-06-27",
  "itemReviewed": {
    "@type": "Service",
    "name": "Lorem Service"
  },
  "author": {
    "@type": "Person",
    "name": "John Smith"
  },
  "reviewRating": {
    "@type": "Rating",
    "worstRating": "1",
    "ratingValue": "5",
    "bestRating": "5"
  }
}
</script>
```

First, we create a Custom HTML Tag in Google Tag Manager. In that tag, we create a JavaScript `document function` within a Script Tag. In that `function`, we create a variable called `jsonld`, which stores our `JSON-LD` data.

```html
<script>
(function () {
    var jsonld = {
        "@context": "http://schema.org/",
        "@type": "Review",
        "url": "https://www.example.com/lorem-services/",
        "name": "Example Lorem Service Review",
        "reviewBody": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.",
        "datePublished": "2017-06-27",
        "itemReviewed": {
            "@type": "Service",
            "name": "Lorem Service"
        },
        "author": {
            "@type": "Person",
            "name": "John Smith"
        },
        "reviewRating": {
            "@type": "Rating",
            "worstRating": "1",
            "ratingValue": "5",
            "bestRating": "5"
        }
    };
})(document);
</script>
```

Then we initialise the Script element, set the type as `"application/ld+json"`, and put the `jsonld` variable data in the  `Inner HTML`. After that, all that's left is to append the script to document Head.

```html
<script>
(function () {
    var jsonld = {
        "@context": "http://schema.org/",
        "@type": "Review",
        "url": "https://www.example.com/lorem-services/",
        "name": "Example Lorem Service Review",
        "reviewBody": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.",
        "datePublished": "2017-06-27",
        "itemReviewed": {
            "@type": "Service",
            "name": "Lorem Service"
        },
        "author": {
            "@type": "Person",
            "name": "John Smith"
        },
        "reviewRating": {
            "@type": "Rating",
            "worstRating": "1",
            "ratingValue": "5",
            "bestRating": "5"
        }
    };
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify( jsonld );
    document.getElementsByTagName('head')[0].appendChild(script);
})(document);
</script>
```

Oh and don't forget to check the box that says _Support `document.write`_.
Since we are done with the coding part, all that is left is to set the trigger, which can be done easily by creating a new trigger and setting the required path, depending on if you want it to trigger on specific pages or all pages.

**TIP:** You can set custom variables in GTM that'll pull the data according to `CSS selectors`, this can be used to make an automated template schema, for pages like blog posts.
