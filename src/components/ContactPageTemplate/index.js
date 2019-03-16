import React, { Component, Fragment } from 'react'
import { navigate } from 'gatsby-link'
import PropTypes from 'prop-types'

function encode (data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

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
            <form className='pa5 black-80 measure center'
              name='contact'
              method='post'
              action='/success'
              encType='application/x-www-form-urlencoded'
              data-netlify='true'
              data-netlify-honeypot='bot-field'
              onSubmit={this.handleSubmit}
            >
              <input type='hidden' name='form-name' value='contact' />
              <div hidden>
                <label>
                  Don’t fill this out:{' '}
                  <input name='bot-field' onChange={this.handleChange} />
                </label>
              </div>
              <div className='mt3'>
                <label htmlFor='name' className='f6 b db mb2'>Name</label>
                <input className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2' type='text'
                  name='name' id='name' onChange={this.handleChange} />
              </div>
              <div className='mt3'>
                <label htmlFor='email' className='f6 b db mb2'>Email</label>
                <input className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2' type='text'
                  name='email' id='email' onChange={this.handleChange} />
              </div>
              <div className='mt3 mb3'>
                <label htmlFor='message' className='f6 b db mb2'>Message</label>
                <textarea className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2' name='message'
                  id='message' rows='6' onChange={this.handleChange} />
              </div>
              <div className='mt5 measure tr'>
                <input type='reset' value='Clear'
                  className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib mr3' />
                <input name='submit' type='submit' value='Send Message'
                  className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' />
              </div>
            </form>
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
