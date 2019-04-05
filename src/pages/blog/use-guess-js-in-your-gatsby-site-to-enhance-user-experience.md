---
templateKey: article-page
title: Use Guess JS in your Gatsby site to enhance User Experience
date: 2019-04-04T17:13:56.164Z
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
Ever since I learn't about **HTTP/2**'s _preload_ and _prefetch_, I had a very small idea  - what if there was a way to use Google Analytics data to predict and prefetch the relevant resources accordingly! That idea came to life with Guess JS, although it had nothing to do with me. What's better is that I learn't about it when a Gatsby JS plugin was released for it. The perfect platform for such a library. But since it is very new and experimental and still evolving there's a lack of proper documentation. While implementing it on this blog I found out that it's not so straight forward. Here's how you can do it.

## Get Required Credentials for _Google Analytics_ API

To get your **Google Analytics API** go to [Google API Console](https://console.developers.google.com/) go to _Credentials_ section in the sidebar.

![google-api-console-credentials-guessjs](/img/screenshot-2019-04-03-at-11.59.00-pm.png "google-api-console-credentials")

Click on _Create credentials_ and select _Service account key_ from the dropdown.

![google-api-console-credentials-guessjs-2](/img/screenshot-2019-04-04-at-12.03.05-am.png "google-api-console-credentials-2")

In the new page create a new Service Account. Give desired names, and for the role select Service Accounts > Service Account User.

![google-api-console-credentials-guessjs-3](/img/screenshot-2019-04-04-at-9.37.59-pm.png "google-api-console-credentials-3")

After clicking on Create, a JSON file would begin downloading.

## Add _gatsby-plugin-guess-js_ to _gatsby-config.js_ dynamically

From the above downloaded JSON file we'll need two credentials `client_email` and `private_key` for the plugin. Also, we'll need Google Analytics View ID. GA View ID can be found in View Section of Google Analytics Admin Page.

![google-analytics-view-id-guessjs](/img/screenshot-2019-04-04-at-9.23.01-pm.png "google-analytics-view-id")

Ideally you store these in an environment variable, for this tutorial's context they'll be **GA_VIEW_ID**, **CLIENT_EMAIL** & **PRIVATE_KEY**.

We begin by installing the plugin:

```bash
yarn add gatsby-plugin-guess-js
```

Next, we add it to our `gatsby-config.js` file, but wait there's a catch. This is what we call a dynamic plugin, to add this we'll need to first create an array and push the plugin to that.

```javascript
const dynamicPlugins = []
// pick data from 3 months ago
const startDate = new Date()
startDate.setMonth(startDate.getMonth() - 3)
if(process.env.CLIENT_EMAIL && process.env.PRIVATE_KEY && process.env.GA_VIEW_ID) {
    dynamicPlugins.push({
      resolve: `gatsby-plugin-guess-js`,
      options: {
        GAViewID: process.env.GA_VIEW_ID,
        jwt: {
          client_email: process.env.CLIENT_EMAIL,
          private_key: process.env.PRIVATE_KEY,
        },
        period: {
          startDate,
          endDate: new Date(),
        },
      },
    })
}
```

Now we take our `dynamicPlugins` array and concat it with our main plugin config array.

```javascript
module.exports = {
  siteMetadata: {
   ....
  },
  plugins: [
   ....
  ].concat(dynamicPlugins)
}
```

And that's it! Now test it out to see if everything works fine.

**TIP:** If you are adding it to an existing project and adding this plugin breaks your build, try removing `.cache`, `public` and `node_modules`, reinstalling the npm packages and then then re building.
