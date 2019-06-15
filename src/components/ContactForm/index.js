import React from 'react'
import { Formik, Field } from 'formik'
import { navigate } from 'gatsby-link'
import validationSchema from './validationSchema'

const ContactForm = () => {
  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

  return (
    <Formik
      initialValues={{ name: null, email: null, message: null }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        fetch("/?no-cache=1", {                                 //eslint-disable-line
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode({
            'form-name': 'contact',
            ...values,
          }),
        })
          .then(() => {
            navigate('/success')
            setSubmitting(false)
          })
          .catch(error => {
            console.log(error)
            setSubmitting(false)
          })
      }}
      render={({
        errors,
        touched,
        isSubmitting,
      }) => (
        <form className='pa5 black-80 measure center'
          name='contact'
          method='post'
          action='/success'
          encType='application/x-www-form-urlencoded'
          data-netlify='true'
          data-netlify-honeypot='bot-field'
        >
          <input type='hidden' name='form-name' value='contact' />
          <div hidden>
            <label>
              Don’t fill this out:{' '}
              <input name='bot-field' />
            </label>
          </div>
          <div className='mt3'>
            <label htmlFor='name' className='f6 b db mb2'>Name</label>
            <Field
              className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2'
              type='text'
              name='name'
            />
          </div>
          <div className='mt3'>
            <label htmlFor='email' className='f6 b db mb2'>Email</label>
            <Field
              className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2'
              type='text'
              name='email'
            />
          </div>
          <div className='mt3 mb3'>
            <label htmlFor='message' className='f6 b db mb2'>Message</label>
            <Field
              className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2'
              name='message'
              rows='6'
            />
          </div>
          <div className='mt5 measure tr'>
            <input type='reset' value='Clear'
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib mr3' />
            <input name='submit' type='submit' value='Send Message'
              disabled={isSubmitting}
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' />
          </div>
        </form>
      )}
    />
  )
}

export default ContactForm
