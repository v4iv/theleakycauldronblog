import React from 'react'
import {GatsbyBrowser} from 'gatsby'
import './src/assets/styles/globals.css'
import {TooltipProvider} from './src/components/ui/tooltip'
import GoogleAnalyticsWrapper from './src/components/GoogleAnalyticsWrapper'

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = ({location}) => {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  const pagePath = location
    ? location.pathname + location.search + location.hash
    : undefined

  setTimeout(() => {
    // @ts-ignore
    if (typeof window.gtag === 'function') {
      // @ts-ignore
      window.gtag('event', 'page_view', {page_path: pagePath})
    }
  }, 100)

  return true
}

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  return (
    <GoogleAnalyticsWrapper>
      <TooltipProvider>{element}</TooltipProvider>
    </GoogleAnalyticsWrapper>
  )
}
