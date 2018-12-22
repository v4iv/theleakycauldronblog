import React from 'react'
import Helmet from 'react-helmet'
import 'tachyons-sass/tachyons.scss'
import config from '../../../config'
import Footer from '../Footer'
import Header from '../Header'

const Layout = (props) => (<div>
  <Helmet>
    <title>{config.siteTitle}</title>
    <meta name='description' content={config.siteDescription} />
    <meta
      name='viewport'
      content='width=device-width, initial-scale=1, user-scalable=no'
    />
  </Helmet>
  <div className='wrapper'>
    <Header />
    <div>{props.children}</div>
    <Footer config={config} />
  </div>
</div>
)

export default Layout
