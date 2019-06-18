---
templateKey: article-page
title: Formik and Yup with Netlify Forms for React Apps
date: 2019-06-17T08:14:41.721Z
cover: /img/formik-netlify-forms-react-yup.jpg
meta_title: Leverage Formik and Yup to make your Netlify Forms hassle free and sanitised.
meta_description: >-
  Use Formik and Yup to make robust forms in conjunction with Netlify Forms.
  Best part, no backend required! With a generous 100 submissions per month,
  it's more than enough for most hobby websites.
tags:
  - ReactJS
  - Netlify
  - Forms
  - Formik
  - Yup
---
Netlify Forms is yet another amazing service provided by Netlify with a generous free tier. For those who don't know, it allows you to set up a form and take submissions without needing a backend. The form data is not only stored in your dashboard, you can directly get a notification on any email address! Sounds interesting right?! As we start implementing you'll find out just how easy it is to setup if you know basics of React. Although I should mention it's not just a React only feature, you can set it up with basic HTML as well!

## Setting Up Formik Form

We're gonna first create a Function Component called `ContactForm.js`, in it we'll begin by setting up Formik and it's required attributes.

```
import React from 'react'
import { Formik, Field } from 'formik'

const ContactForm = () => {
  return (
    <Formik
    />
```
