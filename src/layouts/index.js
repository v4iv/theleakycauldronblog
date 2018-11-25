import React from 'react'
import Helmet from 'react-helmet'
import '../assets/css/fontawesome-all.min.css'
import '../assets/sass/styles.sass'
import config from '../../data/config'
import Socials from '../components/Socials'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet>
      <title>{config.siteTitle}</title>
      <meta name='description' content={config.siteDescription} />
    </Helmet>
    <div className='wrapper'>
      <Socials config={config} />
      <Navbar />
      <div>{children}</div>
      <Footer config={config} />
    </div>
  </div>
)

export default TemplateWrapper
