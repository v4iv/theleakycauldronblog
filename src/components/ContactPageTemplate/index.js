import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Contact from '../Contact'

const ContactPageTemplate = ({
  title,
  subtitle,
  meta_title,
  meta_description,
  contacts,
}) => {
  return (
    <div>
      <Helmet>
        <title>{meta_title}</title>
        <meta name='description' content={meta_description} />
      </Helmet>
      <section className='section'>
        <div className='columns'>
          <div className='column is-10 is-offset-1'>
            <div className='section'>
              <h1 className='title'>{title}</h1>
              <h2 className='subtitle'>{subtitle}</h2>
            </div>
            <section className='section'>
              {contacts.map((contact, id) => (
                <Contact
                  key={id}
                  email={contact.email}
                  description={contact.description}
                />
              ))}
            </section>
          </div>
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
  contacts: PropTypes.array,
};

export default ContactPageTemplate
