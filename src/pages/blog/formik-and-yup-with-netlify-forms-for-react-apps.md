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

We're gonna first install Formik:

```
yarn add formik
```

Then we create a Function Component called `ContactForm.js`, in it we'll begin by setting up Formik and it's required attributes - initialValues, onSubmit & render).

**ContactForm.js:**

```
import React from 'react'
import { Formik, Field } from 'formik'

const ContactForm = () => {
  return (
    <Formik
      initialValues={{ name: '', email: '', message: '' }}
      onSubmit={values => console.log(values)}
      render={({
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
            <input name='submit' type='submit' value='Send Message'
              className='button' />
          </div>
        </form>
      )}
    />
  )
}

export default ContactForm
```

This is a basic Contact form with fields for Name, Email & Message. Next we setup validation using Yup.

## Creating a Validation Schema for Contact Form

Yup is a form validation library and has tight integration with Formik. Yup helps us define schema like Joi and validate against it. Add it to your project:

```
yarn add yup
```

Create a file called validationSchema.js and create a schema as shown below:

**validationSchema.js:**

```
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
