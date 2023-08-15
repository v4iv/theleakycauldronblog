import React, {createContext, useContext, useEffect, useState} from 'react'
import {getThemePreference} from '../../lib/utils'
import {usePrefersDarkMode} from '../../hooks/usePrefersDarkMode'

type ThemeProviderState = {
  theme: string
  setTheme: (theme: string) => void
}

const initialState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: {children: React.ReactNode, defaultTheme?: string
  storageKey?: string}) {
  const [theme, setTheme] = useState(getThemePreference())
  const prefersDarkMode = usePrefersDarkMode()

  useEffect(() => {
    const root = window.document.documentElement
 
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = prefersDarkMode 
      ? "dark"
      : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [prefersDarkMode, theme])

  const value = {
    theme,
    setTheme: (theme: string) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return <ThemeContext.Provider {...props} value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
 
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")
 
  return context
}

export default ThemeContext
