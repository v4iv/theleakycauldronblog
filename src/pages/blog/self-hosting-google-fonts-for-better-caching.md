---
templateKey: article-page
title: Self hosting Google Fonts for better caching
date: 2018-12-05T16:31:06.803Z
cover: /img/self_hosting_google_fonts.png
tags:
  - Caching
  - Fonts
  - ServiceWorker
meta_title: Leverage self hosted Google Fonts for better caching
meta_description: >-
  Self host google fonts to better leverage the browser caching provided by
  starter kit like create-react-app and Gatsby.
---
Just a month ago a college fresher came to me showing her newly made React app, bootstrapped using `create-react-app`. As we got into discussing performance, she told me that everything was almost 100 on [gtmetrix.com](https://gtmetrix.com/) except for **Browser Caching**. That was because of _Google Analytics_ and _Google Fonts_. And, it's not just about browser caching, a lot of times _Google Fonts_ have files that will probably be of no use to us. For example, extra language support. Although, not much can be done about _Google Analytics_, I told her a little hack that will make the _Google Fonts_ problem disappear very easily. Since, starter kits like `create-react-app` and _Gatsby JS_ provide support for caching and service workers, we're better off self hosting.

For this tutorial, we'll be assuming the following:

* This is a create-react-app project
* We need to include Montserrat font from Google Fonts.

Let's begin, by selecting the font on <https://fonts.google.com> for us that will be Montserrat.

![self-hosting-google-fonts-1](/img/screenshot-2018-12-05-at-9.58.11-pm.png)

Next, we copy the URL in the href attribute of the example code. Open the URL from your browser and you'll see a css file, with the code to include the font-face.
