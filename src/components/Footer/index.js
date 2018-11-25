import React from 'react'

const Footer = ({ config }) => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='content has-text-centered'>
          <p>{config.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
