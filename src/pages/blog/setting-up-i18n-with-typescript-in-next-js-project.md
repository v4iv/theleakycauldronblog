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

`pages/index.tsx` :

```typescript
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

`pages/second-page.tsx` :

```typescript
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

```json
"scripts": {
    "dev": "nodemon --exec ts-node --project tsconfig.server.json server",
    "build": "next build && tsc --project tsconfig.server.json",
    "start": "NODE_ENV=production node .build/server",
    "type-check": "tsc"
  },
```

give it a spin, to see if everything is working all right.

## Implementing next-i18next

All that's left now is to add i18next, to do that we begin by adding the following package

```bash
yarn add next-i18next
```
next we add a file `i18n.ts` to our root

`i18n.ts` :

```typescript
const NextI18Next = require('next-i18next/dist/commonjs').default

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['hi'],
  localeSubpaths: 'foreign', // locale subpaths for url could be none, foreign or all
})
```
now we add the i18next middleware to our server as well i18n configuration

`server/index.ts` :

```typescript
const express = require('express')
const next = require('next')
const nextI18NextMiddleware = require('next-i18next/middleware')

const nextI18next = require('../i18n')

const port = process.env.PORT || 3000
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler();

(async () => {
  await app.prepare()
  const server = express()

  // use the next-i18next middleware with our i18n configuration
  try {
    server.use(nextI18NextMiddleware(nextI18next))
  } catch (e) {
    throw (e)
  }

  // handle nextjs routing
  server.get('*', (req, res) => handle(req, res))

  await server.listen(port)
  console.log(`🚀 Ready on http://localhost:${port}`) // eslint-disable-line no-console
})()
```
next we add `appWithTranslation` HOC to a custom `_app.tsx`

`pages/_app.tsx` :

```typescript
import React from 'react'
import App, { Container } from 'next/app'
import { appWithTranslation } from '../i18n'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default appWithTranslation(MyApp)
```

next we add some translations, to do that we need to create a folder called static in our root, then add a folder called locales in static then add folders named with language codes in locales and add common.json files to them. In our case we'll be adding english as default and hindi as the other language

```
.
├── pages
│   ├-- _app.tsx
│   ├-- index.tsx
│   └-- second-page.tsx
├── static
│   └-- locales
│       ├-- en
│       │   └-- common.json
│       └-- hi
│           └-- common.json
├-- server
│   └-- index.ts
├-- .babelrc
├-- i18n.ts
├-- next.config.js
├-- package.json
├-- tsconfig.json
├-- tsconfig.server.json
└── yarn.lock
```
Add translations to `common.json` files

`static/locales/en/common.json` :

```json
{
    "hello-world": "Hello, World!",
    "goto-second-page": "Goto Second Page",
    "change-language": "Change Language",
    "welcome": "Welcome To Second Page",
    "go-back": "Go Back",
}
```

`static/locales/hi/common.json` :

```json
{
    "hello-world": "नमस्ते, विश्व!",
    "goto-second-page": "दूसरे पेज पर जाएं",
    "change-language": "भाषा बदलें",
    "welcome": "दूसरे पेज पर आपका स्वागत है",
    "go-back": "वापस जाएं",
}
```
then we refactor our two pages to include translation HOC, namespaces and translation function, also add a button to change language.

`pages/index.tsx` :

```typescript
import React from 'react'
import { i18n, Link, withNamespaces } from '../i18n' // We replace next/link with the one provide by next-i18next, this helps with locale subpaths

const HomePage: React.FunctionComponent = ({ t }) => (
    <div>
        <h1>{t('hello-world')}</h1>
        <button type='button' onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en')}>{t('change-language')}</button>
        <Link href='/second-page'><button type='button'>{t('goto-second-page')}</button></Link>
    <div>
)

HomePage.getInitialProps = () => ({
  namespacesRequired: ['common'],
})

export default withNamespaces('common')(HomePage)
```
and 

`pages/second-page.tsx` :

```typescript
import React from 'react'
import { withNamespaces, Link } from '../i18n'

const SecondPage: React.FunctionComponent = ({ t }) => (
    <div>
        <h1>{t('welcome')}</h1>
        <Link href='/'><button type='button'>{t('go-back')}</button></Link>
    </div>
)

export default withNamespaces('common')(SecondPage)
```
now all we have to do is make minor changes to our `tsconfig.server.json` to include our i18n compiled file as it is in our build folder

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
    "i18n.ts",
    "next.config.js",
    "server/**/*.ts",
  ]
}
```

That's it we are done now you can go ahead and try to run, to see if everything is working.

And that's how you set up next-i18next with typescript in Next JS app.
