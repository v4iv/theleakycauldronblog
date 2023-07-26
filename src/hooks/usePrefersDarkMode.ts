import {useCallback, useEffect, useMemo, useState} from 'react'

export function usePrefersDarkMode() {
  const [prefersDark, setPrefersDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const handleChange = useCallback((e: MediaQueryListEvent) => {
    const query = '(prefers-color-scheme: dark)'

    if (e.media !== query || e.matches) {
      setPrefersDark(true)
    } else {
      setPrefersDark(false)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = '(prefers-color-scheme: dark)'
      const systemTheme = window.matchMedia(query)

      systemTheme.addEventListener('change', handleChange)

      return () => {
        systemTheme.removeEventListener('change', handleChange)
      }
    }
  }, [handleChange])

  const memoizedPrefersDark = useMemo(() => prefersDark, [prefersDark])

  return memoizedPrefersDark
}
