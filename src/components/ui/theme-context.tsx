import React from 'react'
import {createContext, useEffect, useState} from 'react'
import {getThemePreference} from '../../lib/utils'
import {usePrefersDarkMode} from '../../hooks/usePrefersDarkMode'

const ThemeContext = createContext('light')

// TODO: Better implementation for Dark, Light and System theme
export function ThemeProvider({children}: {children: React.ReactNode}) {
  const [theme, setTheme] = useState(getThemePreference())
  const prefersDarkMode = usePrefersDarkMode()

  useEffect(() => {
    prefersDarkMode ? setTheme('dark') : setTheme('light')
  }, [prefersDarkMode, setTheme])

  useEffect(() => {
    document.body.classList.add(theme)

    return () => {
      document.body.classList.remove(theme)
    }
  }, [theme])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export default ThemeContext
