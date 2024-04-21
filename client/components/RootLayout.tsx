import {Header} from "@/components/Header"
import {Footer} from "@/components/Footer"

interface RootLayoutProps {
  children: React.ReactNode
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return(
    <>
      <Header />
        <main className={`min-h-screen px-[10%]`}>
          {children}
        </main>
      <Footer />
    </>
  )
}
