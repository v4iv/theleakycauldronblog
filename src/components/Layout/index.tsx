import * as React from 'react'
import {Toaster} from '@/components/ui/toaster'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <NavBar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <Toaster />
    </>
  )
}

export default Layout
