import * as React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <main className="md:container md:mx-auto">
      <Header />
      {children}
      <Footer />
    </main>
  )
}

export default Layout
