import React from 'react'
import {GatsbyBrowser} from 'gatsby'
import './src/styles/globals.css'
import {TooltipProvider} from './src/components/ui/tooltip'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  return <TooltipProvider>{element}</TooltipProvider>
}
