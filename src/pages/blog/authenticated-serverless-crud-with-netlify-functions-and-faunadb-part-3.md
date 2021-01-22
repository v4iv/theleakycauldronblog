---
templateKey: article-page
title: Authenticated Serverless CRUD with Netlify Functions and FaunaDB Part 3
slug: authenticated-serverless-crud-netlify-functions-faunadb-part-3
author: Vaibhav Sharma
author_link: https://twitter.com/aleakycauldron
date: 2021-01-22T11:22:44.167Z
cover: /img/marcel-friedrich-authenticated-serverless-crud-netlify-faunadb-part-3.jpg
meta_title: Authenticated Serverless CRUD with Netlify Functions and FaunaDB Part 3
meta_description: Leverage FaunaDB and Netlify Functions to create authenticated
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

In this part, we’ll finally be writing the CRUD APIs. Oh, I hope you have saved the User ID and the Secret Token returned after signing in. If not, go ahead sign in again and save the new ones, as we’ll be needing them.

# Create My Cat

The big idea is to use the secret token we saved earlier as a bearer token and on the server-side, we use it as a regular FaunaDB access token, to initialise the Fauna Client and run queries. In this particular case a query to create a cat.

First, we create a file called `create-my-cat.js` in our functions folder:

```shell
cd functions/ && touch create-my-cat.js
```

Then, we take the authorisation header and retrieve the bearer token to initialise our Fauna Client.

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
                        name: _.get(payload, ['name']),
                        address_line_one: _.get(payload, ['address_line_one']),
                        address_line_two: _.get(payload, ['address_line_two']),
                        userRef: q.Ref(q.Collection('users'), _.get(payload, ['user_id']))
                    }
                }
            )
        )

        callback(null, create_response(200, response))
    } catch (err) {
        console.error(err)

        callback(null, create_response(400, {error: err}));
    }
```

To test the API run the dev server:

```shell
yarn run dev
```

Then, authenticate the user we created earlier, using a POST request to:

<http://localhost:8888/api/create-my-cat>

With the following payload:

```JSON
{
  "email": "foo@bar.com",
  "password": "abc123"
} 
```

And, the authorisation header:

```

```

Make sure to make a few entries before proceeding to the next step.

# Retrieve My Cats

Retrieving the cats is similar, but we’ll be using the Index we created in the last part - cats_by_users. We’ll also be using a FaunaDB Lambda function, which will process the list of cat ids retrieved from the Index to their entire document.

First, create a file retrieve-my-cats.js in the functions folder:

```

```

Then, write the following code in the file:

```

```

To test the API, restart the dev server. Then, make a POST request to the API, with the following payload. (Don’t forget the Authorisation Token in the Header)

```

```

For the next part, make sure to save one of the Cat’s ID.

# Update My Cat

For updating data we’ll use the Cat ID we saved earlier.

First, create a file update-my-cat.js in the functions folder

```

```

Next, write the following code in the file.

```

```

Then, to test the API, restart the dev server and make a PUT request to the API, with changes in the payload. (Don’t forget the Authorisation Token in the Header)

# Delete My Cat

Just like in the last script we’ll use the Cat ID we saved earlier.

First, create a file delete-my-cat.js in the functions folder

```

```

Then, write the following code in the file.

```

```

Then, to test the API, restart the dev server and make a DELETE request to the API. (Don’t forget the Authorisation Token in the Header)

That’s it for this tutorial series on making serverless authenticated CRUD with Netlify Functions and Fauna DB. Hope, you make something awesome.

# Links

**Link to Part 1:** [Authenticated Serverless CRUD with Netlify Functions and FaunaDB Part 1](https://theleakycauldronblog.com/blog/authenticated-serverless-crud-netlify-functions-faunadb-part-1)

**Link to Part 2:** [Authenticated Serverless CRUD with Netlify Functions and FaunaDB Part 2](https://theleakycauldronblog.com/blog/authenticated-serverless-crud-netlify-functions-faunadb-part-2)