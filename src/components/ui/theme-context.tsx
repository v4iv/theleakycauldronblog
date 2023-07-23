import * as React from 'react'
import {createContext, useLayoutEffect, useState} from 'react'
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

  useLayoutEffect(() => {
    prefersDarkMode ? setTheme('dark') : setTheme('light')
  }, [prefersDarkMode, setTheme])

  useLayoutEffect(() => {
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
