import {useCallback, useEffect, useMemo, useState} from 'react'

export function usePrefersDarkMode() {
  const [prefersDark, setPrefersDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const handleChange = useCallback((e: MediaQueryListEvent) => {
    setPrefersDark(e.matches)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      mediaQuery.addEventListener('change', handleChange)

      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }
  }, [handleChange])

  const memoizedPrefersDark = useMemo(() => prefersDark, [prefersDark])

  return memoizedPrefersDark
}
