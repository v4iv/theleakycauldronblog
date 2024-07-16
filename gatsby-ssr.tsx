import React from 'react'
import {GatsbySSR} from 'gatsby'
import {TooltipProvider} from './src/components/ui/tooltip'
import GoogleAnalyticsWrapper from './src/components/GoogleAnalyticsWrapper'

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
        __html: `partytown = { debug: true }`,
      }}
    />,
  ])
}

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({element}) => {
  return <TooltipProvider>{element}</TooltipProvider>
}

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({element}) => {
  return <GoogleAnalyticsWrapper>{element}</GoogleAnalyticsWrapper>
}
