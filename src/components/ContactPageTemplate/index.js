import React from 'react'
import PropTypes from 'prop-types'
import { ContactForm } from '../forms'

const ContactPageTemplate = (props) => {
  const { title, subtitle } = props

  return <section className='mw7 center avenir'>
    <div className='mt3'>
      <div className='pa3 measure center bb'>
        <h1 className='f2 lh-title fw4 mb3 mt0 pt3 bw2 avenir'>{title}</h1>

        <h2 className='f3 mid-gray lh-title avenir fw2'>{subtitle}</h2>
      </div>

      <ContactForm />
    </div>
  </section>
}

ContactPageTemplate.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

export default ContactPageTemplate
