import React from 'react'
import {Script, ScriptStrategy} from 'gatsby'

// haven't been able to make it work, currently GA4 is being implemented by Zaraz
function GoogleAnalyticsWrapper({children}: {children: React.ReactNode}) {
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
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)};
            gtag('js', new Date());
            gtag('config', '${process.env.GATSBY_GTAG}', { page_path: location ? location.pathname + location.search + location.hash : undefined })
          `,
        }}
      />
      <div>{children}</div>
    </>
  )
}

export default GoogleAnalyticsWrapper
