import React from 'react'
import pick from 'lodash.pick'
import {NextIntlClientProvider, useMessages} from 'next-intl'

import NavBar from '@/components/navbar'
import Footer from '@/components/footer'

export default function Template({children}: {children: React.ReactNode}) {
  const messages = useMessages()

  return (
    <NextIntlClientProvider
      messages={
        // Only provide the minimum of messages
        pick(messages, 'common')
      }
    >
      <NavBar />

      <main className="min-h-screen">{children}</main>

      <Footer />
    </NextIntlClientProvider>
  )
}
