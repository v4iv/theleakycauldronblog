import * as React from 'react'
import {Toaster} from '@/components/ui/toaster'
import {Separator} from '@/components/ui/separator'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <NavBar />
      <Separator />
      <main className="min-h-screen">{children}</main>
      <Separator />
      <Footer />
      <Toaster />
    </>
  )
}

export default Layout
