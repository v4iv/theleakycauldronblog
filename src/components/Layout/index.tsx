import React from 'react'
import {Slice} from 'gatsby'

import {Toaster} from '@/components/ui/toaster'
import {Separator} from '@/components/ui/separator'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      {/* Navbar Slice */}
      <Slice alias="navbar" />

      <Separator />

      <main className="min-h-screen antialiased">{children}</main>

      <Separator />

      {/* Footer Slice */}
      <Slice alias="footer" />

      <Toaster />
    </>
  )
}

export default Layout
