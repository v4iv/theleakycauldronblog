import React from 'react'
import {GatsbySSR} from 'gatsby'
import {TooltipProvider} from './src/components/ui/tooltip'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents,
  setHtmlAttributes,
}) => {
  setHtmlAttributes({
    lang: 'en',
    className: 'scroll-smooth',
  })

  setHeadComponents([
    <script
      key="partytown-vanilla-config"
      dangerouslySetInnerHTML={{
        __html: `partytown = { debug: ${!(process.env.NODE_ENV === 'production')} }`,
      }}
    />,
  ])
}

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({element}) => {
  return <TooltipProvider>{element}</TooltipProvider>
}
