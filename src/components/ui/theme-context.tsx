import * as React from 'react'
import {createContext, useEffect, useState} from 'react'
import {usePrefersDarkMode} from '../../hooks/usePrefersDarkMode'

const defaultState = {
  theme: 'light',
  toggleTheme: () => {},
}

const ThemeContext = createContext(defaultState)

export function ThemeProvider({children}: {children: React.ReactNode}) {
  const prefersDarkMode = usePrefersDarkMode()

  const [theme, setTheme] = useState<'light' | 'dark'>(
    prefersDarkMode ? 'dark' : 'light',
  )

  useEffect(() => {
    prefersDarkMode ? setTheme('dark') : setTheme('light')
  }, [prefersDarkMode, setTheme])

  useEffect(() => {
    document.body.classList.add(theme)

    return () => {
      document.body.classList.remove(theme)
    }
  }, [theme])

  const toggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))

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
