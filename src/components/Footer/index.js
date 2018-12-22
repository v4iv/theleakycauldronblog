import React from 'react'
import Socials from '../Socials'

const Footer = ({config}) => {
  return (
    <footer className='pa4 pa5-l black-70 bt b--black-10 mw8 center pv5'>
      <div className='dt dt--fixed w-100'>
        <div className='dn dtc-ns v-mid'>
          <p className='f7 black-70 dib pr3 mb3'>
            {config.copyright} Powered by <a className='link black hover-purple' href='https://www.gatsbyjs.org' target='_blank' rel='noreferrer nofollow noopener'>Gatsby</a>
          </p>
        </div>
        <Socials />
      </div>
      <div className='db dn-ns'>
        <p className='f7 black-70 mt4 tc'>
          {config.copyright} Powered by <a className='link black hover-purple' href='https://www.gatsbyjs.org' target='_blank' rel='noreferrer nofollow noopener'>Gatsby</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
