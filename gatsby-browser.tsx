import * as React from 'react'
import {GatsbyBrowser} from 'gatsby'
import './src/styles/globals.css'
import {TooltipProvider} from './src/components/ui/tooltip'
import {ThemeProvider} from './src/components/ui/theme-context'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  return (
    <ThemeProvider>
      <TooltipProvider>{element}</TooltipProvider>
    </ThemeProvider>
  )
}
