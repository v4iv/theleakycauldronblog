import React from 'react'
import {Script, ScriptStrategy} from 'gatsby'

function ScriptProvider({children}: {children: React.ReactNode}) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtm.js?id=${process.env.GATSBY_GTM_ID}`}
        strategy={ScriptStrategy.offMainThread}
        forward={[`dataLayer.push`]}
      />
      <Script id="gtm-init" strategy={ScriptStrategy.offMainThread}>
        {`
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' })
        `}
      </Script>
      <>{children}</>
    </>
  )
}

export default ScriptProvider
