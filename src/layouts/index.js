import React, {Component} from 'react'
import Helmet from 'react-helmet'
import '../assets/css/fontawesome-all.min.css'
import '../assets/sass/styles.sass'
import config from '../../data/config'
import Socials from '../components/Socials'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

class TemplateWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = { isActive: false }
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar () {
    this.setState({ isActive: !this.state.isActive })
  }

  render () {
    return (<div>
      <Helmet>
        <title>{config.siteTitle}</title>
        <meta name='description' content={config.siteDescription} />
      </Helmet>
      <div className='wrapper'>
        <Socials config={config} />
        <Navbar isActive={this.state.isActive} toggleNavbar={() => this.toggleNavbar()} />
        <div>{this.props.children}</div>
        <Footer config={config} />
      </div>
    </div>
    )
  }
}

export default TemplateWrapper
