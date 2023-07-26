import * as React from 'react'
import {GatsbySSR} from 'gatsby'
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
                    },
                    debug: true
                  }
                `,
      }}
    />,
  ])

  setPreBodyComponents([
    <noscript
      key="gtm"
      dangerouslySetInnerHTML={{
        __html: `
                  <iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GATSBY_GTM_ID}" height="0" width="0"
                      style="display:none;visibility:hidden"></iframe>
                `,
      }}
    />,
    <script
      key="set-theme"
      dangerouslySetInnerHTML={{
        __html: `
                    function getThemePreference() {
                      var storedColorPreference = localStorage.getItem('theme')
                    
                      if (typeof storedColorPreference === 'string') return storedColorPreference
                    
                      var prefersDarkMode = window.matchMedia(
                        '(prefers-color-scheme: dark)',
                      ).matches
                    
                      return prefersDarkMode ? 'dark' : 'light'
                    }

                    var theme = getThemePreference()

                    document.body.classList.add(theme)
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
