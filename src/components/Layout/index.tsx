import React from 'react'
// import {Slice} from 'gatsby'

import {Toaster} from '@/components/ui/toaster'
import {Separator} from '@/components/ui/separator'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      {/* Navbar Slice */}
      {/* <Slice alias="navbar" /> */}
      <NavBar />

      <Separator />

      <main className="min-h-screen antialiased">{children}</main>

      <Separator />

      {/* Footer Slice */}
      {/* <Slice alias="footer" /> */}
      <Footer />

      <Toaster />
    </>
  )
}

export default Layout
