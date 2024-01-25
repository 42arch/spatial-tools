import { ReactNode } from 'react'
import localFont from 'next/font/local'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

export const fontInter = localFont({
  src: [
    {
      path: '../../public/fonts/inter-regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/inter-medium.woff2',
      weight: '500',
      style: 'medium'
    },
    {
      path: '../../public/fonts/inter-semibold.woff2',
      weight: '600',
      style: 'semibold'
    },
    {
      path: '../../public/fonts/inter-bold.woff2',
      weight: '700',
      style: 'bold'
    }
  ],
  variable: '--font-inter',
  display: 'swap'
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontInter.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
