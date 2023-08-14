import React from 'react'
import {GatsbySSR} from 'gatsby'
import {TooltipProvider} from './src/components/ui/tooltip'
import {ThemeProvider} from './src/components/ui/theme-context'

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
                  !(function () {
                    try {
                      const d = document.body,
                        c = d.classList
                      c.remove('light', 'dark')
                      const e = localStorage.getItem('theme')
                      if ('system' === e || (!e && true)) {
                        const t = '(prefers-color-scheme: dark)',
                          m = window.matchMedia(t)
                        if (m.media !== t || m.matches) {
                          c.add('dark')
                        } else {
                          c.add('light')
                        }
                      } else if (e) {
                        c.add(e || '')
                      }
                    } catch (e) {}
                  })()
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
