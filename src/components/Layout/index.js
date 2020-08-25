import React from 'react'
import { Helmet } from 'react-helmet'
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
    </div>
  </>
)

export default Layout
