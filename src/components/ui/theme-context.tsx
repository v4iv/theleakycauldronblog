import * as React from 'react'
import {createContext, useEffect, useState} from 'react'
import {getThemePreference} from '../../lib/utils'
import {usePrefersDarkMode} from '../../hooks/usePrefersDarkMode'

const ThemeContext = createContext('light')

// TODO: Better implementation for Dark, Light and System theme
export function ThemeProvider({children}: {children: React.ReactNode}) {
  const [theme, setTheme] = useState(getThemePreference())
  const prefersDarkMode = usePrefersDarkMode()

  useEffect(() => {
    document.documentElement.classList.add(theme)

    return () => {
      document.documentElement.classList.remove(theme)
    }
  }, [theme])

  useEffect(() => {
    prefersDarkMode ? setTheme('dark') : setTheme('light')
  }, [prefersDarkMode, setTheme])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export default ThemeContext
