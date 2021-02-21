---
templateKey: article-page
title: Formik and Yup with Netlify Forms for React Apps
slug: formik-and-yup-with-netlify-forms-for-react-apps
author: Vaibhav Sharma
authorLink: https://twitter.com/vaibhaved
date: 2019-06-17T08:14:41.721Z
cover: /img/formik-netlify-forms-react-yup.jpg
metaTitle: Leverage Formik and Yup to make your Netlify Forms hassle free and sanitised.
metaDescription: Use Formik and Yup to make robust forms in conjunction with
  Netlify Forms. Best part, no backend required! With a generous 100 submissions
  per month, it's more than enough for most hobby websites.
tags:
  - react js
  - netlify
  - javascript
---
[Netlify Forms](https://www.netlify.com/docs/form-handling/) is yet another amazing service provided by [Netlify](https://www.netlify.com/) with a generous free tier. For those who don't know, it allows you to set up a form and take submissions without needing a backend. The form data is not only stored in your dashboard, but you can also directly get a notification on any email address! Sounds interesting right?! As we start implementing you'll find out just how easy it is to set up if you know basics of React. Although I should mention it's not just a React only feature, you can set it up with basic HTML as well!

## Setting Up Formik Form

We're gonna first install [Formik](https://jaredpalmer.com/formik/):

```bash
yarn add formik
```

Then we create a Function Component called `ContactForm.js`, in it, we'll begin by setting up [Formik](https://jaredpalmer.com/formik/) and it's required props - initialValues, onSubmit & render).

**ContactForm.js:**

```javascript
import React from 'react'
import { Formik, Field } from 'formik'

const ContactForm = () => {
  return (
    <Formik
      initialValues={{ name: '', email: '', message: '' }}
      onSubmit={values => console.log(values)}
      render={({
        isSubmitting,
        handleSubmit,
        handleReset,
      }) => (
        <form className='form'
          name='contact'
          onSubmit={handleSubmit}
          onReset={handleReset}
          data-netlify='true'
          data-netlify-honeypot='bot-field'
        >
          <div className='field'>
            <label htmlFor='name' className='label'>Name</label>
            <Field
              className='input'
              type='text'
              name='name'
            />
          </div>
          <div className='field'>
            <label htmlFor='email' className='label'>Email</label>
            <Field
              className='input'
              type='text'
              name='email'
            />
          </div>
          <div className='field'>
            <label htmlFor='message' className='label'>Message</label>
            <Field
              className='input-textarea'
              name='message'
              component='textarea'
              rows='6'
            />
          </div>
          <div className='buttons'>
            <input type='reset' value='Clear'
              className='button' />
            <input name='submit' type='submit' disabled={isSubmitting} value='Send Message'
              className='button' />
          </div>
        </form>
      )}
    />
  )
}

export default ContactForm
```

You might've noticed that we have also added a flag for Send Message Button to be disabled while submitting. This is to prevent unwanted behaviour.

This is a basic Contact form with fields for Name, Email & Message. Next, we set up validation using Yup.

## Creating a Validation Schema for Contact Form

[Yup](https://github.com/jquense/yup) is a form validation library and has tight integration with [Formik](https://jaredpalmer.com/formik/). [Yup](https://github.com/jquense/yup) helps us define schema like [Joi](https://github.com/hapijs/joi) and validate against it. Add it to your project:

```bash
yarn add yup
```

Create a file called validationSchema.js and create a schema as shown below:

**validationSchema.js:**

```javascript
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is Required!'),
  email: Yup.string()
    .email('Enter a Valid Email!')
    .required('Email is Required!'),
  message: Yup.string()
    .required('Message is Required!'),
})

export default validationSchema
```

Import the above file and add it to formik's `validationSchema` prop.

**ContactForm.js:**

```javascript
import React from 'react'
import { Formik, Field } from 'formik'
import validationSchema from './validationSchema'

const ContactForm = () => {
  return (
    <Formik
      initialValues={{ name: '', email: '', message: '' }}
      validationSchema={validationSchema}
      onSubmit={values => console.log(values)}
    ...
```

## Writing form On Submit method

In on Submit function of [Formik](https://jaredpalmer.com/formik/) Component, we'll replace `console.log` with a `application/x-www-form-urlencoded` fetch request. But before we do that we need to make an uri component encoder (you can use third-party library if you like).

**ContactForm.js:**

```javascript
...
import validationSchema from './validationSchema'

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const ContactForm = () => {
...
```

Now we write the onSubmit method, the fetch request has to be made to home path ie `/`. We also called setSubmitting method, which will be used to change the state of isSubmitting flag.

**ContactForm.js:**

```javascript
...
onSubmit={(values, { setSubmitting }) => {
        fetch("/", {                                 
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode({
            'form-name': 'contact',
            ...values,
          }),
        })
          .then(() => {
            alert('Success!')
            setSubmitting(false)
          })
          .catch(error => {
            alert('Error: Please Try Again!')                            
            setSubmitting(false)
          })
      }}
...
```

If you are using Gatsby JS, especially `gatsby-plugin-offline` then you'll need to add `?no-cache=1` along with `/` or it won't work.

**ContactForm.js:**

```javascript
...
fetch("/?no-cache=1", {   
...
```

## Displaying Validation Errors to User

To display the validation errors we need to use two params from `render` method `touched` & `errors`. `touched` object tells us if the user has touched the field, and `errors` object tell us the errors. We are gonna display the errors if the user has touched the field and there's an error for that field.

**ContactForm.js:**

```javascript
...
      render={({
        touched,
        errors,
        isSubmitting,
        handleSubmit,
        handleReset,
      }) => (
        <form className='form'
          name='contact'
          onSubmit={handleSubmit}
          onReset={handleReset}
          data-netlify='true'
          data-netlify-honeypot='bot-field'
        >
          <div className='field'>
            <label htmlFor='name' className='label'>Name</label>
            <Field
              className='input'
              type='text'
              name='name'
            />
           {touched.name && errors.name && <p className='danger'>{errors.name}</p>}
          </div>
          <div className='field'>
            <label htmlFor='email' className='label'>Email</label>
            <Field
              className='input'
              type='text'
              name='email'
            />
           {touched.email && errors.email && <p className='danger'>{errors.email}</p>}
          </div>
          <div className='field'>
            <label htmlFor='message' className='label'>Message</label>
            <Field
              className='input-textarea'
              name='message'
              component='textarea'
              rows='6'
            />
           {touched.message && errors.message && <p className='danger'>{errors.message}</p>}
          </div>
          <div className='buttons'>
            <input type='reset' value='Clear'
              className='button' />
            <input name='submit' type='submit' disabled={isSubmitting} value='Send Message'
              className='button' />
          </div>
        </form>
      )}
    />
...
```

And with this, we are finally done. Now according to our validation Schema:

* 'Name', 'Email' & 'Message' are required fields.
* 'Name' should be minimum 2 characters and maximum 50 characters.
* 'Email' field should have a valid email.
* And 'Message' field cannot be empty.

I hope this helps you, happy coding.
