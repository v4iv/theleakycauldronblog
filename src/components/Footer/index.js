import React from 'react'

const Footer = ({ config }) => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='content has-text-centered'>
          <p>{config.copyright} Powered by <a href='https://www.gatsbyjs.org' rel='noreferrer nofollow'>Gatsby v2</a></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
