---
templateKey: article-page
title: 'Setting up i18n with TypeScript in Next JS Project '
date: 2019-03-10T18:30:37.108Z
cover: /img/i18n-typescript-nextjs.jpg
meta_title: Setting up i18n with Typescript in Next JS Project
meta_description: >-
  Leverage the power of TypeScript with Next JS and make your project i18n
  ready. Use the plugin next-i18next with your TypeScript Next JS project.
tags:
  - i18n
  - NextJS
  - TypeScript
  - i18next
  - SSR
---
As I was starting a new [NextJS](https://nextjs.org) project, I planned to do it in TypeScript. Since I don't know TypeScript, my initial plan was to learn as I go. Comes the time I had to set up i18n using `next-i18next` plugin, and it was a bit problematic as there was no example for it on the official `next-i18next` repository. After I successfully learnt how to do it, I did make a PR for typescript example on the original repo but this is incase it doesn't get accepted.

Setting up next-i18next in a TS Next app, has 3 parts:

* Setting Up TypeScript Next App
* Adding Custom Server
* Implementing `next-i18next`

Today we'll set up a simple Next app which will have two pages and an option to change language.

## Setting Up TypeScript Next App

We'll start from a blank folder simple-typescript-i18n which we initialise with

```bash
yarn init
```

Then we add the following dependencies

```bash
yarn add @zeit/next-typescript next react react-dom
```

we'll also need some dev dependencies, lets add them

```bash
yarn add @types/next @types/react @types/react-dom typescript --dev
```

Now we add our two pages

`pages/index.ts` :

```typescript jsx
import React from 'react'
import Link from 'next/link'

const HomePage: React.FunctionComponent = () => (
    <div>
        <h1>Hello, World!</h1>
        <Link href='/second-page'><button type='button'>Goto Second Page</button></Link>
    <div>
)

export default HomePage
```

and

`pages/second-page.ts` :

```typescript jsx
import React from 'react'
import Link from 'next/link'

const SecondPage: React.FunctionComponent = () => (
    <div>
        <h1>Welcome To Second Page</h1>
        <Link href='/'><button type='button'>Go Back</button></Link>
    </div>
)

export default SecondPage
```

Then we create the following files in the root folder

`.babelrc` :

```json
{
  "presets": [
    "next/babel",
    "@zeit/next-typescript/babel"
  ]
}
```

`next.config.js`

```json
const withTypescript = require('@zeit/next-typescript')

module.exports = withTypescript()
```

`tsconfig.json` :

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "jsx": "preserve",
    "allowJs": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "removeComments": false,
    "preserveConstEnums": true,
    "sourceMap": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "typeRoots": [
      "./node_modules/@types"
    ],
    "lib": [
      "dom",
      "es2015",
      "es2016"
    ]
  }
}
```

to begin our project all we need to do is set up scripts in `package.json`, add the following lines to your `package.json`

```json
"scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start",
    "type-check": "tsc"
  },
```

Go ahead and give it a run to check if everything is okay

```bash
yarn dev
```

visit <http://localhost:3000> from your browser.

## Adding Custom Server

To add next-i18next it's necessary to have a custom server running, for that we'll need to add the following package

```bash
yarn add express
```

and

```bash
yarn add nodemon ts-node --dev
```
after doing that we need to create our custom server, in the root directory create a folder called server, in that, create a file called `index.ts`

`server/index.ts` :

```typescript
const express = require('express')
const next = require('next')

const port = process.env.PORT || 3000
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler();

(async () => {
  await app.prepare()
  const server = express()

  // handle nextjs routing
  server.get('*', (req, res) => handle(req, res))

  await server.listen(port)
  console.log(`🚀 Ready on http://localhost:${port}`) // eslint-disable-line no-console
})()
```
and then a `tsconfig.server.json` file in the root directory

`tsconfig.server.json` :

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "outDir": ".build",
    "target": "es2017",
    "lib": [
      "es2017"
    ]
  },
  "include": [
    "next.config.js",
    "server/**/*.ts",
  ]
}

```

now all we need to do some changes in our npm scripts, refactor the following lines in `package.json` 

```
"scripts": {
    "dev": "nodemon --exec ts-node --project tsconfig.server.json server",
    "build": "next build && tsc --project tsconfig.server.json",
    "start": "NODE_ENV=production node .build/server",
    "type-check": "tsc"
  },
```
give it a spin, to see if everything is working all right.
