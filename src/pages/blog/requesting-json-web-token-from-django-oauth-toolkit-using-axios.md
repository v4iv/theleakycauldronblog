---
templateKey: article-page
title: Requesting JSON Web Token from Django OAuth Toolkit using Axios
slug: requesting-json-web-token-from-django-oauth-toolkit-using-axios
author: Vaibhav Sharma
author_link: https://twitter.com/vaibhaved
date: '2018-04-12T12:03:26+05:30'
cover: /img/requesting_jwt.jpg
meta_title: Requesting JSON Web Token from Django OAuth Toolkit using Axios
meta_description: >-
  Requesting JSON Web Token for Authentication from Django OAuth Toolkit using
  Axios in your Javascript app.
tags:
  - django
  - react js
  - authentication
  - javascript
  - python
---
When I first switched to Django backend for my React-Redux app, all my authentication requests failed. Which was strange, because I had used the same authentication method with a couple of other backends and it worked fine! At first, I thought it was an error with backend but my Postman and cURL request worked fine. The only error that was thrown, was when I tried to authenticate from my react app using Axios library.

After several restless days of pure frustration, I finally found a workaround that worked. What worked was, encoding every data inline using Template Literals. And If you are facing a similar problem as me, this piece of code might be useful to you as well.

```javascript
import axios from 'axios';


axios({

    // Define Method
    method: 'post',

    // Set Access Token URL
    url: `${ROOT_URL}/o/token/`,

    // Set Headers
    headers: {"Content-Type": "application/x-www-form-urlencoded", 'Cache-Control': "no-cache"},

    // Interpolate variables in the strings using Template Literals
    data: `grant_type=${GRANT_TYPE}&username=${email}&password=${password}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

})
```

After this you can easily get the access and refresh token with `axios(...).then((response) => {console.log(response.data})` .

Hope this helps you.
