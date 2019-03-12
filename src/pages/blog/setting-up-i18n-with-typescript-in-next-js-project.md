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

yarn init

Then we add the following dependencies

yarn add @zeit/next-typescript next react react-dom

we'll also need some dev dependencies, lets add them

yarn add @types/next @types/react @types/react-dom typescript --dev
