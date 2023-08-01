import React from 'react'
import {GatsbyBrowser} from 'gatsby'
import './src/styles/globals.css'
import ScriptProvider from '@/components/ScriptProvider'
import {TooltipProvider} from './src/components/ui/tooltip'
import {ThemeProvider} from './src/components/ui/theme-context'

declare global {
  interface Window {
    gtag?: any
  }
}

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = ({location}) => {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }
  const pagePath = location
    ? location.pathname + location.search + location.hash
    : undefined
  setTimeout(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {page_path: pagePath})
    }
  }, 100)
  return true
}

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  return (
    <ScriptProvider>
      <ThemeProvider>
        <TooltipProvider>{element}</TooltipProvider>
      </ThemeProvider>
    </ScriptProvider>
  )
}
