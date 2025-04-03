// app/admin/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import AdminNav from '@/components/admin-nav'
import SiteFooter from '@/components/site-footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin | Shiv Seva Mandal',
  description: 'Admin panel for Shiv Seva Mandal',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <div className="flex flex-col min-h-screen">
      <AdminNav />
      <main className="flex-grow">
        {children}
      </main>
    </div>

  )
}