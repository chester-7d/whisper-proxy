import type { Metadata } from 'next'
import { Barlow_Condensed, DM_Sans } from 'next/font/google'
import './globals.css'
import { DemoProvider } from '@/lib/demo-context'
import { DemoBar } from '@/components/demo-bar'
import { LenisProvider } from '@/components/lenis-provider'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Janzen & Gand Auto | Expert Automotive Service',
  description: 'Saskatoon\'s trusted auto service shop. Oil changes, brakes, tires, diagnostics and more. Real craftsmanship, honest pricing.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${dmSans.variable}`}>
      <body className="noise-overlay font-body bg-brand-black text-brand-cream antialiased">
        <DemoProvider>
          <LenisProvider>
            <div className="has-demo-bar">
              {children}
            </div>
            <DemoBar />
          </LenisProvider>
        </DemoProvider>
      </body>
    </html>
  )
}
