import React from 'react'
import {GatsbyBrowser} from 'gatsby'
import './src/assets/styles/globals.css'
import './src/assets/styles/easteregg.css'
import {TooltipProvider} from './src/components/ui/tooltip'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  return <TooltipProvider>{element}</TooltipProvider>
}
