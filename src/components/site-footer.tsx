// components/site-footer.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function SiteFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="relative w-10 h-10 mr-2">
                <Image
                  src="/images/logo.png"
                  alt="Shiv Seva Mandal Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-teal-700 text-lg">Shiv Seva Mandal</span>
            </div>
            <p className="text-gray-600">
              Providing free medical equipment to those in need. Our mission is to make healthcare accessible to everyone.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-teal-700 mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-600 hover:text-teal-700">Home</Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-teal-700">Available Equipment</Link>
              <Link href="/about" className="text-gray-600 hover:text-teal-700">About Us</Link>
              <Link href="/contact" className="text-gray-600 hover:text-teal-700">Contact</Link>
            </nav>
          </div>
          
          <div>
            <h3 className="font-semibold text-teal-700 mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-600">
              <p>123 Health Street</p>
              <p>Mumbai, Maharashtra</p>
              <p>Phone: +91 98765 43210</p>
              <p>Email: info@shivsevamandal.org</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Shiv Seva Mandal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}