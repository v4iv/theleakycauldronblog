import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'
import {DarkModeConfig} from 'use-dark-mode'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encode(data: {[key: string]: any}) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

export const darkModeConfig: DarkModeConfig = {
  classNameDark: 'dark',
  classNameLight: 'light',
  storageKey: 'theme',
}
