import React, { Component, Fragment } from 'react'
import { navigate } from 'gatsby-link'
import PropTypes from 'prop-types'
import ContactForm from '../ContactForm'

const encode = (data) => Object.keys(data)
  .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
  .join('&')

class ContactPageTemplate extends Component {
  constructor (props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch("/?no-cache=1", {                                 //eslint-disable-line
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error));                        //eslint-disable-line
  };

  render () {
    const {
      title,
      subtitle,
    } = this.props

    return (
      <Fragment>
        <section className='mw7 center avenir'>
          <div className='mt3'>
            <div className='pa3 measure center bb'>
              <h1 className='f2 lh-title fw4 mb3 mt0 pt3 bw2 avenir'>{title}</h1>
              <h2 className='f3 mid-gray lh-title avenir fw2'>{subtitle}</h2>
            </div>
            <ContactForm />
          </div>
        </section>
      </Fragment>
    )
  }
}

ContactPageTemplate.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

export default ContactPageTemplate
