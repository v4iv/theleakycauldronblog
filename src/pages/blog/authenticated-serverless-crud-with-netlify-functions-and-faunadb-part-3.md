---
templateKey: article-page
title: Authenticated Serverless CRUD with Netlify Functions and FaunaDB Part 3
slug: authenticated-serverless-crud-netlify-functions-faunadb-part-3
author: Vaibhav Sharma
authorLink: https://twitter.com/aleakycauldron
date: 2021-01-22T11:22:44.167Z
cover: /img/marcel-friedrich-authenticated-serverless-crud-netlify-faunadb-part-3.jpg
metaTitle: Authenticated Serverless CRUD with Netlify Functions and FaunaDB Part 3
metaDescription: Leverage FaunaDB and Netlify Functions to create authenticated
  Serverless CRUD APIs with generous free tier.
tags:
  - serverless
  - javascript
  - authentication
  - netlify
---
In the last parts, we have built a foundation of a Netlify Functions serverless project and set up our Fauna DB Collections, Indexes and Roles. We have also written two APIs, Sign Up and Sign In. And if you have followed the last parts, your project folder should look like this:

```
.
├── node_modules/
├── db/
│   └──  bootstrap.js
├── functions/
│      ├-- sign-in.js
│      ├-- sign-up.js
│      └──  hello-world.js   
├-- netlify.toml
├-- package.json
└── yarn.lock
```

In this part, we’ll finally be writing the CRUD APIs. Oh, I hope you have saved the `User ID` and the `Secret Token` returned after signing in. If not, go ahead sign in again and save the new ones, as we’ll be needing them.

# Create My Cat

The big idea is to use the `secret token` we saved earlier as a `bearer token` and on the server-side, we use it as a regular FaunaDB access token, to initialise the Fauna Client and run queries. In this particular case a query to create a cat.

First, we create a file called `create-my-cat.js` in our functions folder:

```shell
cd functions/ && touch create-my-cat.js
```

Then, we take the `authorisation header` and retrieve the bearer token to initialise our Fauna Client.

```javascript
const faunadb = require('faunadb')

const q = faunadb.query

module.exports.handler = async (event, context, callback) => {
    const payload = JSON.parse(event.body)
    let authorisation = event.headers.authorization
    authorisation = authorisation.split(" ")
    const token = authorisation[1]

    const client = new faunadb.Client({
        secret: token
    })
}
```

Finally, we write the query to create an entry of a cat, from the payload, we also save a reference to the user who created the entry.

```javascript
    try {
        const response = await client.query(
            q.Create(
                q.Collection('addresses'), {
                    data: {
                        name: payload.name,
                        image: payload.image,
                        breed: payload.breed,
                        userRef: q.Ref(q.Collection('users'), payload.user_id)
                    }
                }
            )
        )

        callback(null, {
         statusCode: 200,
         headers: {
             /* Required for CORS support to work */
             "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Headers": "*",
             "Access-Control-Allow-Methods": "POST, OPTIONS",
         },
         body: JSON.stringify(response),
      })
    } catch (err) {
        console.error(err)

        callback(null, {
         statusCode: 400,
         headers: {
             /* Required for CORS support to work */
             "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Headers": "*",
             "Access-Control-Allow-Methods": "POST, OPTIONS",
         },
         body: JSON.stringify({error: err}),
      });
    }
```

To test the API run the dev server:

```shell
yarn run dev
```

Then, authenticate the user we created earlier, using a `POST` request to:

<http://localhost:8888/api/create-my-cat>

With the following payload:

```json
{
  "user_id": "285249298598199809",
  "name": "mr snugglepants",
  "image": "https://example.com/cat_1.jpg",
  "breed": "maine coon"
} 
```

And, the authorisation header:

```json
{
  "authorization": "Bearer fnED_83xz1ACAAPy2UP8gAYBHFYA7Xw0l-0EDv_oWF4fj28gX9I"
}
```

Make sure to make a few entries before proceeding to the next step.

# Retrieve My Cats

Retrieving the cats is similar, but we’ll be using the Index we created in the last part - `cats_by_users`. We’ll also be using a FaunaDB Lambda function, which will process the list of cat ids retrieved from the Index to their entire document.

First, create a file `retrieve-my-cats.js` in the functions folder:

```shell
touch retrieve-my-cats.js
```

Then, write the following code in the file:

```javascript
const faunadb = require('faunadb')

const q = faunadb.query

module.exports.handler = async (event, context, callback) => {
    const payload = JSON.parse(event.body)
    let authorisation = event.headers.authorization
    authorisation = authorisation.split(" ")
    const token = authorisation[1]
    const user_id = payload.user_id

    const client = new faunadb.Client({
        secret: token
    })
    
     try {
        const response = await client.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index('cats_by_users'),
                        q.Ref(q.Collection("users"), user_id)
                    )
                ),
                q.Lambda('catBreedsRef', q.Get(q.Var("catBreedsRef")))
            )
        )

        callback(null, {
         statusCode: 200,
         headers: {
             /* Required for CORS support to work */
             "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Headers": "*",
             "Access-Control-Allow-Methods": "POST, OPTIONS",
         },
         body: JSON.stringify(response),
      })
    } catch (err) {
        console.error(err)

        callback(null, {
         statusCode: 400,
         headers: {
             /* Required for CORS support to work */
             "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Headers": "*",
             "Access-Control-Allow-Methods": "POST, OPTIONS",
         },
         body: JSON.stringify({error: err}),
      });
    }
}
```

To test the API, restart the dev server. Then, make a `POST` request to the API, with the following payload. (Don’t forget the Authorisation Token in the Header)

```json
{
  "user_id": "285249298598199809",
}
```

For the next part, make sure to save one of the **Cat’s ID**.

# Update My Cat

For updating data we’ll use the Cat ID we saved earlier.

First, create a file `update-my-cat.js` in the functions folder

```shell
touch update-my-cat.js
```

Next, write the following code in the file.

```javascript
const faunadb = require('faunadb')

const q = faunadb.query

module.exports.handler = async (event, context, callback) => {
    const payload = JSON.parse(event.body)
    let authorisation = event.headers.authorization
    authorisation = authorisation.split(" ")
    const token = authorisation[1]
    const cat_id = payload.cat_id
    const data = payload.data

    const client = new faunadb.Client({
        secret: token
    })
    
     try {
        const response = await client.query(
            q.Replace(
                q.Ref(q.Collection('cat_breeds'), cat_id),
                {
                    data: data
                })
        )

        callback(null, {
         statusCode: 200,
         headers: {
             /* Required for CORS support to work */
             "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Headers": "*",
             "Access-Control-Allow-Methods": "PUT, OPTIONS",
         },
         body: JSON.stringify(response),
      })
    } catch (err) {
        console.error(err)

        callback(null, {
         statusCode: 400,
         headers: {
             /* Required for CORS support to work */
             "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Headers": "*",
             "Access-Control-Allow-Methods": "PUT, OPTIONS",
         },
         body: JSON.stringify({error: err}),
      });
    }
}
```

Then, to test the API, restart the dev server and make a `PUT` request to the API, with changes in the payload. (Don’t forget the Authorisation Token in the Header)

```json
{
  "cat_id": "288175339623940608",
  "data": {
    "breed": "tabby"
  }
}
```

# Delete My Cat

Just like in the last script we’ll use the Cat ID we saved earlier.

First, create a file `delete-my-cat.js` in the functions folder

```shell
touch delete-my-cat.js
```

Then, write the following code in the file.

```javascript
const faunadb = require('faunadb')

const q = faunadb.query

module.exports.handler = async (event, context, callback) => {
    const payload = JSON.parse(event.body)
    let authorisation = event.headers.authorization
    authorisation = authorisation.split(" ")
    const token = authorisation[1]
    const cat_id = payload.cat_id


    const client = new faunadb.Client({
        secret: token
    })
    
     try {
        const response = await client.query(
            q.Delete(
                q.Ref(q.Collection('cat_breeds'), cat_id))
        )

        callback(null, {
         statusCode: 200,
         headers: {
             /* Required for CORS support to work */
             "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Headers": "*",
             "Access-Control-Allow-Methods": "DELETE, OPTIONS",
         },
         body: JSON.stringify(response),
      })
    } catch (err) {
        console.error(err)

        callback(null, {
         statusCode: 400,
         headers: {
             /* Required for CORS support to work */
             "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Headers": "*",
             "Access-Control-Allow-Methods": "DELETE, OPTIONS",
         },
         body: JSON.stringify({error: err}),
      });
    }
}
```

Then, to test the API, restart the dev server and make a `DELETE` request to the API. (Don’t forget the Authorisation Token in the Header)

That’s it for this tutorial series on making serverless authenticated CRUD with Netlify Functions and Fauna DB. Hope, you make something awesome.

# Links

**Link to Part 1:** [Authenticated Serverless CRUD with Netlify Functions and FaunaDB Part 1](https://theleakycauldronblog.com/blog/authenticated-serverless-crud-netlify-functions-faunadb-part-1)

**Link to Part 2:** [Authenticated Serverless CRUD with Netlify Functions and FaunaDB Part 2](https://theleakycauldronblog.com/blog/authenticated-serverless-crud-netlify-functions-faunadb-part-2)
