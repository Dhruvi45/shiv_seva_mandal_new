// components/header.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 mr-2">
              <Image
                src="/images/logo.png"
                alt="Shiv Seva Mandal Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-teal-700 text-lg">Shiv Seva Mandal</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-teal-700">Home</Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-teal-700">Equipment</Link>
            <Link href="/about" className="text-gray-600 hover:text-teal-700">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-teal-700">Contact</Link>
          </nav>
          
          <div>
            <Button asChild variant="ghost" className="text-teal-700 hover:bg-teal-50">
              <Link href="/admin">Admin</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}