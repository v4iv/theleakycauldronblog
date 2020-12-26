import React from 'react'
import { Formik, Field, Form } from 'formik'
import validationSchema from './validationSchema'
import { encode } from '../../utils'
import { navigate } from '@reach/router'

const NewsletterForm = () => {
  const handleSubmit = (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
    fetch("/?no-cache=1", {                                 //eslint-disable-line
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'NewsLetter',
        ...values,
      }),
    })
      .then(() => {
        navigate('/success/').then(() => {
          resetForm({ email: '' })
          setStatus({ success: true })
        })
      })
      .catch(error => {
        console.log(error)
        setStatus({ success: false })
        alert('Error: Please Try Again!')                            //eslint-disable-line
        setSubmitting(false)
        setErrors({ submit: error.message })
      })
  }

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form name='NewsLetter' data-netlify='true' data-netlify-honeypot='bot-field'>
          <Field
            className='mw-100 w-100 w-75-m w-80-l f5 ba b--black-20 pv3 ph4 border-box'
            type='email'
            id='email'
            name='email'
            placeholder="Email Address"
            aria-label='Email'
          />

          <button
            aria-label='Subscribe'
            type='submit'
            value='Subscribe'
            disabled={isSubmitting}
            className='w-100 w-25-m w-20-l bg-black-80 white f5 pv2 pv3-ns ph4 ba b--black-80 bg-hover-mid-gray'
          >
            Subscribe
          </button>

          {touched.email && errors.email && <p className='f6 red'>{errors.email}</p>}
        </Form>
      )}
    </Formik>
  )
}

export default NewsletterForm
