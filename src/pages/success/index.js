import React from 'react'
import { Link } from 'gatsby'
import 'tachyons-sass/tachyons.scss'
import { Helmet } from 'react-helmet'

const SuccessPage = () => (
  <>
    <Helmet
      htmlAttributes={{
        lang: `en`,
      }}
      title='Unsubscribed | The Leaky Cauldron Blog'
      meta={[
        {
          name: `description`,
          content: `Unsubscribed The Leaky Cauldron Blog Newsletter!`,
        },
        {
          name: `viewport`,
          content: `width=device-width, initial-scale=1`,
        },
      ]}
    />
    <section className='vh-100 avenir'>
      <header className='tc ph5 lh-copy'>
        <h1 className='f1 f-headline-l code mb3 fw9 dib tracked-tight light-pink'>Success!</h1>

        <h2 className='tc f1-l fw1'>Your Message Was Sent Successfully.</h2>
      </header>

      <p className='fw1 i tc mt4 mt5-l f4 f3-l'>We'll contact you ASAP.</p>

      <ul className='list tc pl0 w-100 mt5'>
        <li className='dib'><Link className='f5 f4-ns link black db pv2 ph3 hover-light-blue' to='/' replace>Home</Link></li>

        <li className='dib'><Link className='f5 f4-ns link black db pv2 ph3 hover-light-green' to='/about' replace>About</Link></li>

        <li className='dib'><Link className='f5 f4-ns link black db pv2 ph3 hover-light-yellow' to='/contact' replace>Contact</Link></li>

        <li className='dib'><Link className='f5 f4-ns link black db pv2 ph3 hover-light-pink' to='/search' replace>Search</Link></li>
      </ul>
    </section>
  </>
)

export default SuccessPage
