import {Roboto, Scada} from "next/font/google"

import {Header} from "@/components"

export const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const scada = Scada({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-scada',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

interface RootLayoutProps {
  children: React.ReactNode
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return(
    <main className={`${roboto.variable} ${scada.variable}`}>
      <Header/>
      {children}
    </main>
  )
}