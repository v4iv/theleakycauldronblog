import '@/styles/globals.css'

import React from 'react'
import {notFound} from 'next/navigation'
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server'

import {TooltipProvider} from '@/components/ui/tooltip'
import {ThemeProvider} from '@/components/ui/theme-provider'

type Props = {
  children: React.ReactNode
  params: {locale: string}
}

const locales = ['en']

export async function generateStaticParams() {
  return locales.map((locale) => ({locale}))
}

// Locale Metadata
export async function generateMetadata({
  params: {locale},
}: Omit<Props, 'children'>) {
  const t = await getTranslations({locale, namespace: 'common'})

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: [
        {
          rel: 'icon',
          sizes: '192x192',
          url: '/icon-192.png',
        },
        {
          rel: 'icon',
          sizes: '512x512',
          url: '/icon-512.png',
        },
      ],
      apple: '/apple-touch-icon.png',
    },
  }
}

export default function LocaleLayout({children, params: {locale}}: Props) {
  if (!locales.includes(locale as any)) notFound()

  unstable_setRequestLocale(locale)

  return (
    <html lang={locale}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
