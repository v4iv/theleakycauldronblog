---
templateKey: article-page
title: Use Guess JS in your Gatsby site to enhance User Experience
date: 2019-04-01T17:13:56.164Z
cover: /img/gatsby-guess-js.jpg
meta_title: Leverage Guess JS in your Gatsby website to improve user experience
meta_description: >-
  Learn how to use guess js to enhance user experience of your Gatsby site.
  Guess JS uses Google Analytics data to determine which page a user is mostly
  likely to visit next from a given page and prefetches them, making UX super
  smooth.
tags:
  - GatsbyJS
  - GuessJS
  - MachineLearning
  - UX
---
Ever since I learn't about HTTP/2 's preload and prefetch, I had a very small idea  - what if there was a way to use Google Analytics data to predict and prefetch the relevant resources accordingly! That idea came to life with Guess JS, although it had nothing to do with me. What's better is that I learn't about it when a Gatsby JS plugin was released for it. The perfect platform for such a library. But since it is very new and experimental and still evolving there's a lack of proper documentation. While implementing it on this blog I found out that it's not so straight forward. Here's how you can do it.

## Get Required Credentials for _Google Analytics_ API

To get your **Google Analytics API** go to [Google API Console](https://console.developers.google.com/) go to _Credentials_ section in the sidebar.

![google-api-console-credentials-guessjs](/img/screenshot-2019-04-03-at-11.59.00-pm.png "google-api-console-credentials")

Click on _Create credentials_ and select _Service account key_ from the dropdown.

![google-api-console-credentials-guessjs-2](/img/screenshot-2019-04-04-at-12.03.05-am.png "google-api-console-credentials-2")

In the new page create a new Service Account. Give desired names, and for the role select

## Add _gatsby-plugin-guess-js_ to _gatsby-config.js_ dynamically
