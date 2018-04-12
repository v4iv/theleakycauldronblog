---
templateKey: article-page
title: Requesting JSON Web Token from Django OAuth Toolkit using Axios
date: '2018-04-12T12:03:26+05:30'
cover: /img/djanooauthtoolkitreact.png
tags:
  - Django
  - ReactJS
  - OAuth
meta_title: Requesting JSON Web Token from Django OAuth Toolkit using Axios
meta_description: Requesting JSON Web Token from Django OAuth Toolkit using Axios
---
When I first switched to Django backend for my React-Redux app, all my authentication requests failed. Which was strange, because I had used the same authentication method with couple of other backends and it worked fine! At first I thought it was an error with backend but my Postman and cURL request worked fine. The only error that was thrown, was when i tried to authenticate from my react app using axios library.

After several restless days of pure frustration, I finally found a workaround that worked. What worked was, encoding every data inline using Template Literals. And If you are facing similar problem as me, this piece of code might be useful to you as well.

```
import axios from 'axios';axios({    method: 'post',    url: `${ROOT_URL}/o/token/`,    headers: {"Content-Type": "application/x-www-form-urlencoded", 'Cache-Control': "no-cache"},    data: `grant_type=${GRANT_TYPE}&username=${email}&password=${password}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`})
```
