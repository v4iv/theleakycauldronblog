import React from 'react'
import {GatsbySSR} from 'gatsby'
import ScriptProvider from './src/components/ScriptProvider'
import {TooltipProvider} from './src/components/ui/tooltip'
import {ThemeProvider} from './src/components/ui/theme-context'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHtmlAttributes,
  setHeadComponents,
  setPreBodyComponents,
}) => {
  setHtmlAttributes({
    lang: 'en',
  })

  setHeadComponents([
    <script
      key="partytown-vanilla-config"
      dangerouslySetInnerHTML={{
        __html: `partytown = {
           resolveUrl(url, location) {
              if (url.hostname.includes('google-analytics')) {
                // Use a secure connection
                if (url?.protocol === 'http:') {
                  url = new URL(url.href.replace('http', 'https'))
                }

                // Point to our proxied URL
                const proxyUrl = new URL(location.origin + '/__third-party-proxy')
                proxyUrl.searchParams.append('url', url)

                return proxyUrl
              }

              return url
           }
         }`,
      }}
    />,
  ])

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
    <ScriptProvider>
      <ThemeProvider>
        <TooltipProvider>{element}</TooltipProvider>
      </ThemeProvider>
    </ScriptProvider>
  )
}
