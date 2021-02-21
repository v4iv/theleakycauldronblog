---
templateKey: article-page
title: Self hosting Google Fonts for better caching
slug: self-hosting-google-fonts-for-better-caching
author: Vaibhav Sharma
authorLink: https://twitter.com/vaibhaved
date: 2018-12-05T16:31:06.803Z
cover: /img/self_hosted_google_fonts.jpg
metaTitle: Leverage self hosted Google Fonts for better caching
metaDescription: >-
  Self host google fonts to better leverage the browser caching provided by
  starter kit like create-react-app and Gatsby.
tags:
  - caching
  - fonts
  - javascript
---
Just a month ago a college fresher came to me showing her newly made React app, bootstrapped using `create-react-app`. As we got into discussing performance, she told me that everything was almost 100 on [gtmetrix.com](https://gtmetrix.com/) except for **Browser Caching**. That was because of _Google Analytics_ and _Google Fonts_. And, it's not just about browser caching, a lot of times _Google Fonts_ have files that will probably be of no use to us. For example, extra language support. Although not much can be done about _Google Analytics_, I told her a little hack that will make the _'Google Fonts'_ problem disappear very easily. Since starter kits like `create-react-app` and _Gatsby JS_ provide support for caching and service workers, we're better off self-hosting.

For this tutorial, we'll be assuming the following:

* This is a `create-react-app` project
* We need to include Montserrat font from _Google Fonts_.

Let's begin, by selecting the font on <https://fonts.google.com> for us that will be _Montserrat_.

![self-hosting-google-fonts-1](/img/screenshot-2018-12-05-at-9.58.11-pm.png)

Next, we copy the URL in the `href` attribute of the example code. Open the URL from your browser and you'll see a CSS file, with the code to include the font-face.

![self-hosted-google-fonts-2](/img/screenshot-2018-12-05-at-9.59.21-pm.png)

We see here that there are quite a few font files that the API pulled. Let's say for this article that we don't need the Vietnamese support. So, we just copy the Latin and Cyrillic parts of the stylesheet. In the code, we see, there's a URL for the font file. We download the fonts using that URL and keep them in a local project folder. Now, all we need to do is replace the URL from the cloud-hosted to the relative address of the locally stored file.

```css
src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v12/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');
```

to

```css
src: local('Montserrat Regular'), local('Montserrat-Regular'), url(../fonts/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');
```

`create-react-app` allows us to directly import CSS files, we just import our stylesheet in the javascript.

```javascript
...
import './styles.css';
```

And, that's all we need to do, `create-react-app` automatically takes care of caching and service worker. This works for other libraries like _Gatsby JS_ as well.
That's all for this article.
