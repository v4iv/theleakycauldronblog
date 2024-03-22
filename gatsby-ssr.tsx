import React from 'react'
import {GatsbySSR} from 'gatsby'
import {TooltipProvider} from './src/components/ui/tooltip'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHtmlAttributes,
}) => {
  setHtmlAttributes({
    lang: 'en',
    className: 'scroll-smooth',
  })
}

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({element}) => {
  return <TooltipProvider>{element}</TooltipProvider>
}
