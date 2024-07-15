import React from 'react'
import {Script, ScriptStrategy} from 'gatsby'

import {Toaster} from '@/components/ui/toaster'
import {Separator} from '@/components/ui/separator'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <NavBar />

      <Separator />

      <main className="min-h-screen antialiased">{children}</main>

      <Separator />

      <Footer />

      <Toaster />

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GTAG}`}
        strategy={ScriptStrategy.offMainThread}
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
    </>
  )
}

export default Layout
