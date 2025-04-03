// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import SiteFooter from '@/components/site-footer'
import SecretCodeListener from '@/components/SecretCodeListener'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shiv Seva Mandal',
  description: 'Free medical equipment for those in need',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This function checks if the current URL is an admin route
  // Note: this won't work on the server side, we need a client component for this
  // Since we'd need usePathname() from next/navigation
  // Since we can't use hooks in a server component, Option 1 is generally better

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {/* Remove Header component here */}
          <SecretCodeListener />
          <main className="flex-grow">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}