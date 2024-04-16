import React from "react"

import {Header} from "@/components/Header"
import {Footer} from "@/components/Footer"

interface RootLayoutProps {
  children: React.ReactNode
}

export const RootLayout = ({ children }: RootLayoutProps): React.ReactNode => {
  return(
    <React.Fragment>
      <Header />
      <main className={`min-h-screen px-[10%]`}>
        {children}
      </main>
      <Footer />
    </React.Fragment>
  )
}
