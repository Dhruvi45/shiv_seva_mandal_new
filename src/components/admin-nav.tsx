// components/admin-nav.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  
  // Function to check if the link is active
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }
  
  // Logout function
  const handleLogout = async () => {
    // Call the server action for logout (will implement this separately)
    try {
      // Clear admin cookie client-side before redirecting
      document.cookie = 'adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
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
          
            <Button 
              onClick={handleLogout}
              variant="destructive" 
              className="bg-red-600 hover:bg-red-700" 
              size="sm"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}