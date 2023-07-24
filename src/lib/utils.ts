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
  if (typeof window === 'undefined') return 'light'

  const storedThemePreference = localStorage.getItem('theme')

  if (typeof storedThemePreference === 'string') return storedThemePreference

  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches

  return prefersDarkMode ? 'dark' : 'light'
}
