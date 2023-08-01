import React from 'react'
import {Script, ScriptStrategy} from 'gatsby'

function ScriptProvider({children}: {children: React.ReactNode}) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GTAG}`}
        strategy={ScriptStrategy.offMainThread}
        forward={[`dataLayer.push`]}
      />
      <Script
        id="gtag-config"
        strategy={ScriptStrategy.offMainThread}
        forward={[`gtag`]}
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)};
          gtag('js', new Date());
          gtag('config', ${process.env.GATSBY_GTAG}, { page_path: location ? location.pathname + location.search + location.hash : undefined })
        `}
      </Script>
      <>{children}</>
    </>
  )
}

export default ScriptProvider
