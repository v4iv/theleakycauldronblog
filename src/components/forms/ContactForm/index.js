import React from 'react'
import { Formik, Field, Form } from 'formik'
import { navigate } from 'gatsby'
import validationSchema from './validationSchema'
import { encode } from '../../../utils'

const ContactForm = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    fetch("/?no-cache=1", {                                 //eslint-disable-line
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'Contact',
        ...values,
      }),
    })
      .then(() => {
        navigate('/success').then(() => {
          setSubmitting(false)
        })
      })
      .catch(error => {
        console.log(error)
        alert('Error: Please Try Again!')                            //eslint-disable-line
        setSubmitting(false)
      })
  }

  return (
    <Formik
      initialValues={{ name: '', email: '', message: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='pa5 black-80 measure center' name='Contact' data-netlify='true' data-netlify-honeypot='bot-field'>
          <div className='mt3'>
            <label htmlFor='name' className='f6 b db mb2'>Name</label>

            <Field
              className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2'
              type='text'
              id='name'
              name='name'
              aria-label='Name'
            />

            {touched.name && errors.name && <p className='f6 red'>{errors.name}</p>}
          </div>

          <div className='mt3'>
            <label htmlFor='email' className='f6 b db mb2'>Email</label>

            <Field
              className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2'
              type='email'
              id='email'
              name='email'
              aria-label='Email'
            />

            {touched.email && errors.email && <p className='f6 red'>{errors.email}</p>}
          </div>

          <div className='mt3 mb3'>
            <label htmlFor='message' className='f6 b db mb2'>Message</label>

            <Field
              className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2'
              component='textarea'
              rows='6'
              id='message'
              name='message'
              aria-label='Message'
            />

            {touched.message && errors.message && <p className='f6 red'>{errors.message}</p>}
          </div>

          <div className='mt5 measure tr'>
            <button
              aria-label='Clear'
              type='reset'
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib mr3'
            >
              Clear
            </button>

            <button
              aria-label='Send Message'
              type='submit'
              value='Send Message'
              disabled={isSubmitting}
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
            >
              Send Message
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export { ContactForm }
