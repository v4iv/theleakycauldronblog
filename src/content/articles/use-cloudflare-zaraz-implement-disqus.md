---
title: Use Cloudflare Zaraz to implement Disqus performantly
description: Use Cloudflare Zaraz to implement Disqus performantly by offloading
  resource-intensive third-party scripts to a web worker freeing up your main
  thread for your code.
pubDate: 2024-03-14T12:30:00.000Z
slug: use-cloudflare-zaraz-implement-disqus
author: vaibhav-sharma
cover: src/assets/media/disqus-comments-zaraz-catherine-heath.jpg
tags:
  - typescript
  - react js
---
Using Third-Party Embeddings is always taxing on the performance metrics, but none(in my opinion) are as bad as Disqus, or as I call it — The Necessary Evil. It has a million errors & warnings, outdated APIs and is overall a mess! It's so bad that I wonder if Disqus has dropped their entire dev team! I have seen people employ multiple strategies to combat this issue, like clicking to load comments, separate pages for comments, web worker loaders etc. 

> Web worker loader offloads resource-intensive third-party scripts to a web worker freeing up your main thread for your code.

Out of all these, I found web worker strategies to be the most natural user experience. There are a few web worker providers like [Partytown](https://partytown.builder.io) and [Cloudflare Zaraz](https://www.cloudflare.com/application-services/products/zaraz/) that are mostly preferred.

## Prerequisite

This tutorial assumes you already have Cloudflare DNS setup for your Website or Cloudflare is your DNS Provider.

## Why did I choose Zaraz over Partytown?

My blog is built with [Gatsby JS](https://www.gatsbyjs.com), which has native support for Partytown. So, you must be wondering why I went with Zaraz, let me tell you, I didn't, at least not at first. I first attempted to implement it with the [Gatsby Script API off-main-thread strategy](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-script/), which is a fancy wrapper on Partytown. But that didn't work out because it was built for *Gatsby Cloud* primarily, and even though Netlify claims, it supports the redirections required to make it work,(via `gatsby-adapter-netlify`), I couldn't make it work. And not for the lack of trying, as I wasn't the only one who found this task nearly impossible, given the forum posts, I encountered. This naturally left me with the only available option — Cloudflare Zaraz.

## Embedding Disqus

Embedding Disqus has three steps:

* Create a `<div/>` with id `"disqus_thread"`.
* Implement a config loading function.
* Insert the Disqus embedding JS.

```javascript
<div id="disqus_thread"></div>
<script>
    /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
    /*
    var disqus_config = function () {
    this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    */
    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://EXAMPLE.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
</script>
```

### Frontend Code

The first step is easy enough - just add a `div` to the page where you want the comments. Next, add the `disqus_config` script to the page where you want the comments, and replace the variables, since I'm using Gatsby, I'll be using Gatsby's Script API, and pass the page `URL`, `identifier` and title to it, and push it to production.

```jsx
import {Script, ScriptStrategy} from 'gatsby'
.
.
.
<>
      <div id="disqus_thread" className="p-3 md:px-0 md:py-5" />

      <Script
        id={id}
        strategy={ScriptStrategy.postHydrate}
        dangerouslySetInnerHTML={{
          __html: `var disqus_config = function () {
            this.page.url = "${url}";
            this.page.identifier = "${id}"; 
            this.page.title = "${title}";
          };`,
        }}
      />

      <noscript>
        <div className="p-3 md:px-0 md:py-5">
          Please enable JavaScript to view the{' '}
          <a href="https://disqus.com/?ref_noscript">
            comments powered by Disqus.
          </a>
        </div>
      </noscript>
</>
```

### Implementing Disqus Script with Cloudflare Zaraz

Go to your project, and then, in the left side panel, click on Zaraz.

![Cloudflare Zaraz in left side panel](src/assets/media/screenshot-2024-03-14-at-11.17.48 am.jpg "Cloudflare Zaraz in left side panel")

The way Zaraz works is you have to create a `trigger` and attach that trigger to the code you want to insert into your website. There are a few templates, but Disqus is not one of them, so we'll use a `Custom HTML Tool` to insert it. So click on Custom HTML.

![Custom HTML Tool](src/assets/media/screenshot-2024-03-14-at-11.26.21 am.jpg "Custom HTML Tool")

You'll be asked for a few permissions, grant them, and give it a name.

![Confirm permission](src/assets/media/screenshot-2024-03-14-at-11.26.38 am.jpg "Confirm permission")

![Execute JS permission](src/assets/media/screenshot-2024-03-14-at-11.26.45 am.jpg "Execute JS permission")

![Name the tool](src/assets/media/screenshot-2024-03-14-at-11.27.02 am.jpg "Name the tool")

While Zaraz provides a default trigger i.e. `Pageview`, which loads on every page view, we don't want to load Disqus scripts on every page, so we'll create a new Trigger by going to *Triggers* tab and clicking on Create a trigger. We'll add two rules to this trigger — 

* first, that'll identify the page to load the script on, by checking if the URL contains `/blog/` (although you can use whatever identifying pattern you want) 
* and second, that'll check if the user has scrolled enough that we should begin loading the comments, I have used a scroll depth of 50%, you can choose your own. Though I'd recommend at least 10%, or else it sometimes doesn't work.

![Create Trigger](src/assets/media/screenshot-2024-03-14-at-11.17.13 am.jpg "Create Trigger")

Then we go to the Third-Party Tools tab and click on Disqus > Edit and add the Trigger `Blog view` and the Disqus `embed.js` to it.

![Third-party tool](src/assets/media/screenshot-2024-03-16-at-8.13.39 pm.jpg "Third-party tool")

This should load Disqus comments on your website using Zaraz.
