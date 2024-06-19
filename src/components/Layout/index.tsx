import React from 'react'

import {Toaster} from '@/components/ui/toaster'
import {Separator} from '@/components/ui/separator'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <NavBar />

      <Separator />

      <main className="min-h-screen antialiased">{children}</main>

      <Separator />

      <Footer />

      <Toaster />
    </>
  )
}

export default Layout
