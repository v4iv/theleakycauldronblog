import * as React from 'react'
import {createContext, useEffect, useState} from 'react'
import {usePrefersDarkMode} from '../../hooks/usePrefersDarkMode'
import {getThemePreference} from '../../lib/utils'

const defaultState = {
  theme: 'light',
  toggleTheme: () => {},
}

const ThemeContext = createContext(defaultState)

export function ThemeProvider({children}: {children: React.ReactNode}) {
  const [theme, setTheme] = useState<string>(getThemePreference())

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

  const toggleTheme = () => {
    localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark')

    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
