import React from 'react'
import 'tachyons-sass/tachyons.scss'
import UnsubscribeForm from '../../components/UnsubscribeForm'

const SuccessPage = () => (
  <section className='vh-100 avenir'>
    <header className='tc ph5 lh-copy'>
      <h1 className='f1 f-headline-l code mb3 fw9 dib tracked-tight light-pink'>Unsubscribe Newsletter</h1>
      <h2 className='tc f1-l fw1'>Enter Your Email ID to Unsubscribe.</h2>
    </header>
    <p className='fw1 i tc mt4 mt5-l f4 f3-l ma3'>
      <section className="cf mb4">
        <div className="mb4 mb0-ns fl w-100">
          <UnsubscribeForm/>
        </div>
      </section>
    </p>
  </section>
)

export default SuccessPage
