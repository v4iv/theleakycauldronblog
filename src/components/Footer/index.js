import React from 'react'

const Footer = ({ config }) => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='content has-text-centered'>
          <p>{config.copyright}</p>
          <p>Powered by <a href='https://www.gatsbyjs.org' rel='noreferrer nofollow' target='_blank'>Gatsby</a> and <a href='https://www.netlifycms.org' rel='noreferrer nofollow' target='_blank'>Netlify CMS</a></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
