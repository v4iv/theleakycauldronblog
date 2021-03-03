import React from 'react'
import PropTypes from 'prop-types'
import Socials from '../Socials'
import { NewsletterForm } from '../forms'
import BuyMeACoffee from '../BuyMeACoffee'

const Footer = (props) => {
  const {
    copyright,
    siteRss,
    coffeeLink,
  } = props

  return <footer className='pa4 pa5-l black-70 bt b--black-10 mw8 center pv5'>
    <section className="center cf mb4">
      <div className="mb4 mb0-ns fl w-100">
        <p className="f4 fw6 mb2 f6 mt0 avenir">
          Sign up for our newsletter.
        </p>

        <NewsletterForm/>
      </div>
    </section>

    <div className='dt dt--fixed w-100'>
      <div className='dn dtc-ns v-mid'>
        <p className='f7 black-70 dib pr3 mb3'>
          {copyright} Powered by <a className='link black hover-purple' href='https://www.gatsbyjs.com' target='_blank' rel='noreferrer nofollow noopener'>Gatsby</a>
        </p>
      </div>

      <Socials siteRss={siteRss}/>
    </div>

    <div className='db dn-ns'>
      <p className='f7 black-70 mt4 tc'>
        {copyright} Powered by <a className='link black hover-purple' href='https://www.gatsbyjs.com' target='_blank' rel='noreferrer nofollow noopener'>Gatsby</a>
      </p>
    </div>

    <div className='dbx'>
      <p className='f7 black-70 mt4 tc'>
        <BuyMeACoffee coffeeLink={coffeeLink}/>
      </p>
    </div>
  </footer>
}

Footer.propTypes = {
  siteRss: PropTypes.string,
  copyright: PropTypes.string,
  coffeeLink: PropTypes.string,
}

export default Footer
