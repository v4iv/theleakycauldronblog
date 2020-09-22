import React from 'react'
import { Helmet } from 'react-helmet'
import CookieConsent from 'react-cookie-consent'
import 'tachyons-sass/tachyons.scss'
import config from '../../../config'
import Footer from '../Footer'
import Header from '../Header'
// import NotifcationBanner from '../NotificationBanner'

const Layout = (props) => (
  <>
    <Helmet
      htmlAttributes={{
        lang: `en`,
      }}
      title={config.siteTitle}
      meta={[
        {
          name: `description`,
          content: config.siteDescription,
        },
        {
          name: `viewport`,
          content: `width=device-width, initial-scale=1`,
        },
      ]}
    />
    <div className='wrapper'>
      {/* <NotifcationBanner text='Happy New Year 2020!' dismissible /> */}

      <Header siteTitle={config.siteTitle} />

      <div>{props.children}</div>

      <Footer copyright={config.copyright} siteRss={config.siteRss} />

      <CookieConsent
        acceptOnScroll
        acceptOnScrollPercentage={5}
        enableDeclineButton
        disableButtonStyles
        location='bottom'
        cookieName='gatsby-gdpr-google-tagmanager'
        buttonText='I Understand'
        declineButtonText='Decline'
        style={{ background: 'white' }}
        buttonClasses='f6 button-reset dim b--dark-blue ba ph4 pv2 mh2 mv2 dib bg-white dark-blue pointer fw1 baskerville'
        declineButtonClasses='f6 button-reset dim b--mid-gray ba ph4 pv2 mh2 mv2 dib bg-white mid-gray pointer fw1 baskerville'
        containerClasses='center br2 ba b--light-blue'
        contentClasses=' avenir f6 lh-copy fw3 black'
      >
        {config.cookieConsent}
      </CookieConsent>
    </div>
  </>
)

export default Layout
