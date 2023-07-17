import * as React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout
