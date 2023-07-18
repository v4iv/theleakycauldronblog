import * as React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="md:container md:mx-auto">
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
