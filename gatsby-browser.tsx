import React from 'react'
import {GatsbyBrowser} from 'gatsby'
import './src/assets/styles/globals.css'
import {TooltipProvider} from './src/components/ui/tooltip'
import GoogleAnalyticsWrapper from './src/components/GoogleAnalyticsWrapper'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  return <TooltipProvider>{element}</TooltipProvider>
}

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => {
  return <GoogleAnalyticsWrapper>{element}</GoogleAnalyticsWrapper>
}
