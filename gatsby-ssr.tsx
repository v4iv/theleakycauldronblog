import React from 'react'
import {GatsbySSR} from 'gatsby'
import {TooltipProvider} from './src/components/ui/tooltip'
import {ThemeProvider} from './src/components/ui/theme-provider'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHtmlAttributes,
  setPreBodyComponents,
}) => {
  setHtmlAttributes({
    lang: 'en',
    className: 'scroll-smooth',
  })

  setPreBodyComponents([
    <script
      key="set-theme"
      dangerouslySetInnerHTML={{
        // taken from next-themes, removes flicker
        __html: `
        !function(){try{let e=document.body,t=e.classList;t.remove("light","dark");let a=localStorage.getItem("theme");if("system"!==a&&a)a&&t.add(a||"");else{let d="(prefers-color-scheme: dark)",s=window.matchMedia(d);s.media!==d||s.matches?t.add("dark"):t.add("light")}}catch(c){}}();
        `,
      }}
    />,
  ])
}

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({element}) => {
  return (
    <ThemeProvider>
      <TooltipProvider>{element}</TooltipProvider>
    </ThemeProvider>
  )
}
