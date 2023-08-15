import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encode(data: {[key: string]: any}) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

export function getThemePreference() {
  if (typeof window === 'undefined') return 'system'

  const storedTheme = localStorage.getItem('theme')

  if ('system' === storedTheme || (!storedTheme && true)) {
    const query = '(prefers-color-scheme: dark)',
      systemTheme = window.matchMedia(query)
    if (systemTheme.media !== query || systemTheme.matches) {
      return 'dark'
    } else {
      return 'light'
    }
  }

  return 'system'
}
