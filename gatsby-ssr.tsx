import * as React from 'react'
import {GatsbySSR} from 'gatsby'
import {TooltipProvider} from './src/components/ui/tooltip'
import {ThemeProvider} from './src/components/ui/theme-context'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHtmlAttributes,
  setPreBodyComponents,
}) => {
  setHtmlAttributes({
    lang: 'en',
  })
  setPreBodyComponents([
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
