import React from 'react'
import Helmet from 'react-helmet'
import 'tachyons-sass/tachyons.scss'
import config from '../../../config'
import Footer from '../Footer'
import Header from '../Header'

const Layout = (props) => (
  <>
    <Helmet>
      <title>{config.siteTitle}</title>
      <meta name='description' content={config.siteDescription} />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1'
      />
    </Helmet>
    <div className='wrapper'>
      <Header siteTitle={config.siteTitle} />
      <div>{props.children}</div>
      <Footer copyright={config.copyright} />
    </div>
  </>
)

export default Layout
