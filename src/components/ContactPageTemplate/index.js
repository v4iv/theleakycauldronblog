import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

const ContactPageTemplate = ({
  title,
  subtitle,
  meta_title,
  meta_description,
}) => {
  return (
    <div>
      <Helmet>
        <title>{meta_title}</title>
        <meta name='description' content={meta_description} />
      </Helmet>
      <section className='mw7 center avenir'>
        <div className='mt3'>
          <div className='pa3 measure center bb'>
            <h1 className='f2 lh-title fw4 mb3 mt0 pt3 bw2 avenir'>{title}</h1>
            <h2 className='f3 mid-gray lh-title avenir fw2'>{subtitle}</h2>
          </div>
          <form className='pa5 black-80 measure center'
            name='contact'
            method='post'
            data-netlify='true'
            data-netlify-honeypot='bot-field'
            action='/success'
          >
            <div className='mt3'>
              <label htmlFor='name' className='f6 b db mb2'>Name</label>
              <input className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2' type='text'
                name='name' id='name' />
            </div>
            <div className='mt3'>
              <label htmlFor='email' className='f6 b db mb2'>Email</label>
              <input className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2' type='text'
                name='email' id='email' />
            </div>
            <div className='mt3'>
              <label htmlFor='message' className='f6 b db mb2'>Message</label>
              <textarea className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2' name='message'
                id='message' rows='6' />
            </div>
            <div className='mt5 measure tr'>
              <input type='reset' value='Clear'
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib mr3' />
              <input type='submit' value='Send Message'
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' />
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

ContactPageTemplate.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  meta_title: PropTypes.string,
  meta_description: PropTypes.string,
}

export default ContactPageTemplate
