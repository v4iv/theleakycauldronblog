---
templateKey: article-page
title: Authenticated Serverless CRUD with Netlify Functions and FaunaDB Part 1
slug: authenticated-serverless-crud-netlify-functions-faunadb-part-1
author: Vaibhav Sharma
authorLink: https://instagram.com/theleakycauldronblog
date: 2021-01-18T14:34:54.026Z
cover: /img/chris-barbalis-serverless-netlify-faunadb.jpg
metaTitle: Authenticated Serverless CRUD with Netlify Functions and FaunaDB Part 1
metaDescription: Leverage FaunaDB and Netlify Functions to create authenticated
  Serverless CRUD APIs with generous free tier.
tags:
  - serverless
  - javascript
  - authentication
  - netlify
---
Last month, one of my best friends decided he wanted to fulfil his lifelong dream of opening a restaurant. So while we were discussing how to go about doing that I suggested to him to try cloud kitchen first, as we realised we didn’t want to risk investing too much, in uncertain times like this. Since we wanted to invest as little as we can get away with, I decided to try the generous free tier of *Netlify Functions* and *Fauna DB*. Having worked extensively with *AWS Lambda* Serverless Functions I was itching to try Netlify Functions, as I thought it’ll be right up my alley. But I was sceptical about FaunaDB especially since I’m not comfortable with the hassle, that is, setting up *GraphQL* and I was conflicted about learning Fauna’s native query language *FQL*. But after quickly skimming through docs I decided to try FQL. And, while I did run into some trouble, I finally got a hang of it and decided that I’d write an article on setting up Authenticated CRUD APIs using the two.

# What We’ll Be Building

We’ll be building a Sign-Up API, a Sign In API and Authenticated CRUD APIs for our Cats database. Before we begin, make sure you have the `netlify-dev` package installed globally on your machine.

```shell
yarn global add netlify-dev
```

NOTE: This write-up assumes that you have some familiarity with serverless functions. This article will not teach you FQL in detail, but merely show you how you can leverage FaunaDB and Netlify Functions to create authenticated serverless APIs. I use `yarn`, but you can use `npm` as well.

# Setup Fauna

We begin by signing up for a free Fauna DB account (I love the fact that neither Fauna nor Netlify needs a credit card to sign up). 

After that, we have to create a new database, in Fauna Cloud Console:

1. Click on “*New Database*”
2. Enter a name for the database, I’ll go with “*Cats*”
3. Click “*Save*”

Next, we need to generate a database access key secret:

1. Click on “*Security*” in the Left Navigation
2. Click on “*New Key*”
3. Select Database “*Cats*” and Role “*Admin*”
4. Enter a key name, I’ll go with “*API*”
5. Click “*Save*”

You’ll get a long alphanumeric key, copy it and save it, as you’ll not get to see it again. We’ll need it later.

# Setup Netlify Functions Project

Now for the serverless part, we need to first create an empty node project. 

Create a directory called cats.

```shell
mkdir cats && cd cats/
```

Then,  initialise with `yarn init`.

```shell
yarn init 
```

Now install the following package:

```shell
yarn add faunadb
```

Then in your `package.json` add the following script:

```json
“scripts”: {
  “dev”: “netlify dev”
}
```

The `netlify-dev` package allows us to emulate the netlify production environment on our local machine. It also injects variables saved in a `.env` file into the environment, bringing us to the next step.

Create a file `.env`:

```shell
touch .env
```

In this file add the Fauna DB access secret that we had generated earlier, as follows:

```
FAUNADB_SECRET=”your-fauna-db-access-key”
```

Now, we finally get to the functions part.

Create a folder called `functions` in your project root, you can set it to whatever you like but I prefer the `functions` convention:

```shell
mkdir functions && cd functions/
```

In the functions directory, we create our first serverless function `hello-world.js` to test if everything works so far.

Create a file called `hello-world.js`, in the functions folder. Remember the file name will be the `slug` for accessing our function API.

```shell
touch hello-world.js
```

Inside `hello-world.js` we will write a generic AWS Lambda function, since Netlify Functions is just a wrapper on AWS Lambda:

```javascript
module.exports.handler = (event, context, callback) => {
  // "event" has information about the path, body, headers, etc. of the request
  console.log('event', event)

  // "context" has information about the lambda environment and user details
  console.log('context', context)

  // The "callback" ends the execution of the function and returns a response back to the caller
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: 'Hello, World!'
    })
  })
}
```

We are not done yet, as netlify still doesn’t know where our functions are stored. For that, we need to specify our functions folder in `netlify.toml` file.

Create a file called `netlify.toml` in the project root:

```shell
cd .. && touch netlify.toml
```

In `netlify.toml`, specify functions directory

```toml
[build]
  functions = "functions"
```

Finally, it’s time to test if everything works. First, we run our `netlify dev` environment then we can test our API using `Postman`.

```shell
yarn run dev
```

The dev server will probably start at [http://localhost:8888](http://localhost:8888/) and we can access our API at:

<http://localhost:8888/.netlify/functions/hello-world>

It should give the following output:

```
Hello, World!
```

One final thing, before we proceed, let's make our API URL a bit more pretty, as `/.netlify/functions/` doesn’t look aesthetic enough for production. To do that we need to add redirect instructions in our `netlify.toml` file.

Add the following to our `netlify.toml` file:

```toml
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

Great now let's try to access our pretty URL:

<http://localhost:8888/api/hello-world>

Hopefully, we still get the same output as before.

In the next parts we'll create our Fauna DB Collections, Indexes and Roles, as well as write the CRUD APIs.

# Links

**Link to Part 2:** [Authenticated Serverless CRUD with Netlify Functions and FaunaDB Part 2](https://theleakycauldronblog.com/blog/authenticated-serverless-crud-netlify-functions-faunadb-part-2)

**Link to Part 3:** [Authenticated Serverless CRUD with Netlify Functions and FaunaDB Part 3](https://theleakycauldronblog.com/blog/authenticated-serverless-crud-netlify-functions-faunadb-part-3)
