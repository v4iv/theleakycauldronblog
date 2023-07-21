import * as React from 'react'
import {Toaster} from '@/components/ui/toaster'
import {Separator} from '@/components/ui/separator'
import {TooltipProvider} from '@/components/ui/tooltip'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <TooltipProvider>
      <NavBar />

      <Separator />

      <main className="min-h-screen">{children}</main>

      <Separator />

      <Footer />

      <Toaster />
    </TooltipProvider>
  )
}

export default Layout
