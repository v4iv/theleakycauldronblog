import * as React from 'react'
import {GatsbySSR} from 'gatsby'
import {TooltipProvider} from './src/components/ui/tooltip'
import {ThemeProvider} from './src/components/ui/theme-context'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHtmlAttributes,
}) => {
  setHtmlAttributes({
    lang: 'en',
  })
}

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({element}) => {
  return (
    <ThemeProvider>
      <TooltipProvider>{element}</TooltipProvider>
    </ThemeProvider>
  )
}
