---
templateKey: article-page
title: Authenticated Serverless CRUD with Netlify Functions and FaunaDB Part 2
slug: authenticated-serverless-crud-netlify-functions-faunadb-part-2
author: Vaibhav Sharma
authorLink: https://www.instagram.com/theleakycauldronblog
date: 2021-01-19T19:58:58.728Z
cover: /img/ga-authenticated-serverless-crud-netlify-faunadb-part-2.jpg
metaTitle: Authenticated Serverless CRUD with Netlify Functions and FaunaDB Part 2
metaDescription: Leverage FaunaDB and Netlify Functions to create authenticated
  Serverless CRUD APIs with generous free tier.
tags:
  - serverless
  - javascript
  - authentication
  - netlify
---
In the last part, we set up our *FaunaDB* account, generated a database access secret and set up our *Netlify Functions* project. We also made a serverless API that returns *“Hello, World!”*. 

Link to Part 1: [Authenticated Serverless CRUD with Netlify Functions and FaunaDB Part 1](https://theleakycauldronblog.com/blog/authenticated-serverless-crud-netlify-functions-faunadb-part-1)

If everything was set up properly according to the last tutorial the project folder should look like this:

```
.
├── node_modules/
├── functions
│      └──  hello-world.js   
├-- netlify.toml
├-- package.json
└── yarn.lock
```

In this part, we will first, programmatically set up our database `Collections`, `Indexes` and `Roles`. Then, we’ll set up the user sign-up and sign-in APIs.

# Bootstrap Fauna Database

For our Cats project, we’ll need two tables or “`Collections`” — `users` and `cat_breeds`. And while we can make our Collections, Indexes and Roles using the Fauna Cloud Console GUI, setting it up programmatically allows us to keep the settings as a template which can be deployed locally as well. 

First, install `dotenv` package

```shell
yarn add dotenv
```

Next, create a folder `db` at the project root:

```shell
mkdir db 
```

Then in the `db` folder create a file `bootstrap.js`

```shell
cd db && touch bootstrap.js
```

In the `bootstrap.js` file, we’ll first import `dotenv` and `faunadb`.

```javascript
require('dotenv').config()
const faunadb = require('faunadb')


console.log('Creating FaunaDB database...')
```

## Creating Collections

First, we write a function to create our Collections, in that function we initiate the Fauna `query` and Fauna `client`.

```javascript
const createCollections = key => {
  const q = faunadb.query


  const client = new faunadb.Client({
    secret: key
  })

}
```

Now we have to write the queries to create Collections in our `createCollections` function:

```javascript
// Users Collection
client.query(
   q.CreateCollection({name: 'users'})
)
   .then(ret => console.log('Success: %s', ret))
   .catch(err => console.error('Error: %s', err))



// CatBreeds Collection
client.query(
   q.CreateCollection({name: ‘cat_breeds’})
)
   .then(ret => console.log('Success: %s', ret))
   .catch(err => console.error('Error: %s', err))
```

## Creating Indexes

Indexes are used to quickly locate data without having to search every individual document (or row of data) in the database. We’ll create an index to look up users by email so that we can sign them in and another to get the cats.

In the `bootstrap.js` file add another function, `createIndexes` and initialise the Fauna query and client.

```javascript
const createIndexes = key => {
  const q = faunadb.query


  const client = new faunadb.Client({
    secret: key
  })
}
```

Next, we need to write the query to create our indexes, in our `createIndexes` function.

```javascript
// Users by Email Index
client.query(
   q.CreateIndex({
       name: 'users_by_email',
       permissions: {read: "public"},
       source: q.Collection("users"),
       terms: [{field: ["data", "email"]}],
       unique: true,
   })
)
   .then(ret => console.log('Success: %s', ret))
   .catch(err => console.error('Error: %s', err))


// Cat Breeds by Users Index
client.query(
   q.CreateIndex({
       name: 'cats_by_users',
       source: [q.Collection("cat_breeds")],
       terms: [{field: ["data", "userRef"]}],
   })
)
   .then(ret => console.log('Success: %s', ret))
   .catch(err => console.error('Error: %s', err))
```

## Create Roles

User-defined roles provide configurable, domain-specific security rules. They are the core schema for attribute-based access control. For example, you can create roles like Staff, Customers etc. Here we’ll be creating a role for our users so that they all can access the Cat Breeds table and the `cats_by_users` index.

As before, create a function, name it `createRoles`.

```javascript
const createRoles = key => {
  const q = faunadb.query


  const client = new faunadb.Client({
    secret: key
  })
}
```

And then, write the queries for the role, `cat_whisperers`:

```javascript
client.query(q.CreateRole({
   name: "cat_whisperers",
   membership: [
       {
           resource: q.Collection("users"),
       }
   ],
   privileges: [
       {
           resource: q.Collection("cat_breeds"),
           actions: {
               read: true,
               write: true,
               create: true,
               delete: true,
               history_read: false,
               history_write: false,
               unrestricted_read: false
           }
       },
       {
           resource: q.Index("'cats_by_users'"),
           actions: {
               unrestricted_read: false,
               read: true
           }
       },
   ],

}))
   .then(ret => console.log('Success: %s', ret))
   .catch(err => console.error('Error: %s', err))
```

We don’t need to add permission for our other index because that is already public.

## Running the Bootstrap Script

Before we run the script we need to call the above functions after checking if the environment has `FAUNADB_SECRET`:

```javascript
if (!process.env.FAUNADB_SECRET) {
   console.error('FaunaDB Secret Key not found!')
} else {
   createCollections(process.env.FAUNADB_SECRET)
   createIndexes(process.env.FAUNADB_SECRET)
   createRoles(process.env.FAUNADB_SECRET)
}
```

Now, we can finally run it!

```shell
node ./db/bootstrap.js
```

You can go to Fauna Cloud Console and verify if everything was created as desired. After doing that, we can finally start writing our APIs.

# Sign Up

This is a simple one, first, we initialise Fauna `Client` and `Query` with `FAUNADB_SECRET`. And then write an FQL query to create a user.

Create a file `sign-up.js` in the `functions` folder:

```shell
cd functions && touch sign-up.js
```

Then add the following code to the file. This function will take user data and store it to users collection as well as utilise Fauna native `credentials` storage to safely store the password in a hashed format:

```javascript
const faunadb = require('faunadb')


const q = faunadb.query
const client = new faunadb.Client({
   secret: process.env.FAUNADB_SECRET
})



module.exports.handler = async (event, context, callback) => {
   let payload = JSON.parse(event.body)
   
   // user_data part of payload can contain all that you want to store about the user but it must contain email for our login to work
   let user_data = payload.user_data

   const password = payload.password



   try {
       const user = await client.query(
           q.Create(
               q.Collection('users'), {
                   credentials: {
                       password: password
                   },
                   data: user_data
               }
           )
       )


       const response = user.data


       callback(null, {
       statusCode: 200,
       headers: {
         /* Required for CORS support to work */
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify(response),
    })
   } catch (err) {
       console.error(err)

       callback(null, {
         statusCode: 500,
         headers: {
           /* Required for CORS support to work */
           "Access-Control-Allow-Origin": "*",
           "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
        body: JSON.stringify({error: err}),
      })
   }
}
```

To test the API run the netlify dev server.

```shell
yarn run dev
```

Then, make a user using a `POST` request to:

<http://localhost:8888/api/sign-up>

With the following payload:

```json
{
  "password": "abc123",
  "user_data": {
    "name": "foo bar",
    "email": "foo@bar.com"
  }
}
```

That should successfully create a user with email: [foo@bar.com](<>) & password: abc123.

# Sign In

To sign in we’ll use Fauna’s native `Login` function. This will take the password in the incoming payload and convert it to the hash format and try to match it against the stored hash. We’ll be using the `users_by_email` Index that we created earlier to identify the user.

First, we need to create a file, let’s name it `sign-in.js`

```shell
touch sign-in.js
```

Then add the following code to the file:

```javascript
const faunadb = require('faunadb')


const q = faunadb.query
const client = new faunadb.Client({
   secret: process.env.FAUNADB_SECRET
})



module.exports.handler = async (event, context, callback) => {
   let payload = JSON.parse(event.body)

   const email = payload.email

   const password = payload.password


   try {
       const response = await client.query(
           q.Login(
               q.Match(q.Index('users_by_email'), email),
               {password: password}
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
      })
   }
}
```

Finally, to test the API run the dev server:

```shell
yarn run dev
```

Then, authenticate the user we created earlier, using a `POST` request to:

<http://localhost:8888/api/sign-in>

With the following payload:

```json
{
  "email": "foo@bar.com",
  "password": "abc123"
}
```

This should give you a response like this:

```json
{
   "ref": {
       "@ref": {
           "id": "288175339623940608",
           "collection": {
               "@ref": {
                   "id": "tokens"
               }
           }
       }
   },
   "ts": 1611084270140000,
   "instance": {
       "@ref": {
           "id": "285249298598199809",
           "collection": {
               "@ref": {
                   "id": "users",
                   "collection": {
                       "@ref": {
                           "id": "collections"
                       }
                   }
               }
           }
       }
   },
   "secret": "fnED_83xz1ACAAPy2UP8gAYBHFYA7Xw0l-0EDv_oWF4fj28gX9I"
}
```

Save the `secret`, we’ll be using it while making authenticated CRUD requests. We’ll also be needing user id, it’s in the response: `instance => @ref => id`

That’s it for this part, In the next part, we’ll finally be writing the code for authenticated CRUD requests.

# Links

**Link to Part 1:** [Authenticated Serverless CRUD with Netlify Functions and FaunaDB Part 1](https://theleakycauldronblog.com/blog/authenticated-serverless-crud-netlify-functions-faunadb-part-1)

**Link to Part 3:** [Authenticated Serverless CRUD with Netlify Functions and FaunaDB Part 3](https://theleakycauldronblog.com/blog/authenticated-serverless-crud-netlify-functions-faunadb-part-3)
