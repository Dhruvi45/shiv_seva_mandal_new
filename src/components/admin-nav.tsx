// components/admin-nav.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function AdminNav() {
  const pathname = usePathname()
  
  // Function to check if the link is active
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }
  
  return (
    <nav className="bg-teal-700 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/admin" className="flex items-center">
            <div className="relative w-8 h-8 mr-2">
              <Image
                src="/images/logo.png"
                alt="Shiv Seva Mandal Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold">Admin Panel</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/admin" 
              className={`${isActive('/admin') && pathname === '/admin' ? 'bg-teal-800' : ''} px-3 py-2 rounded hover:bg-teal-800`}
            >
              Dashboard
            </Link>
            <Link 
              href="/admin/equipment" 
              className={`${isActive('/admin/equipment') ? 'bg-teal-800' : ''} px-3 py-2 rounded hover:bg-teal-800`}
            >
              Equipment
            </Link>
            <Link 
              href="/admin/allocations" 
              className={`${isActive('/admin/allocations') ? 'bg-teal-800' : ''} px-3 py-2 rounded hover:bg-teal-800`}
            >
              Allocations
            </Link>
            <Link 
              href="/" 
              className="px-3 py-2 rounded hover:bg-teal-800"
            >
              Back to Site
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}