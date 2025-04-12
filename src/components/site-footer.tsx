// components/site-footer.tsx
import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="bg-gray-100 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="font-bold text-teal-700 mb-2">Shiv Seva Mandal</h3>
            <p className="text-gray-600 text-sm">
              Providing free medical equipment to those in need
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <h4 className="font-semibold text-gray-700 mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/" className="text-gray-600 hover:text-teal-700">Home</Link></li>
              <li><Link href="/dashboard" className="text-gray-600 hover:text-teal-700">Equipment</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-teal-700">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-teal-700">Contact</Link></li>
              <li>
                {/* Hidden admin link with special CSS to make it very subtle */}
                <Link 
                  href="/admin-login" 
                  className="text-gray-300 hover:text-gray-400 text-xs mt-8 inline-block"
                  aria-label="Admin Access"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="mt-4 md:mt-0">
            <h4 className="font-semibold text-gray-700 mb-2">Contact</h4>
            <address className="text-sm text-gray-600 not-italic">
              Shiv Seva Mandal<br />
              123 Community St.<br />
              Email: contact@shivsevamandal.org<br />
              {/* Phone: (123) 456-7890 */}
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Shiv Seva Mandal. All rights reserved.
        </div>
      </div>
    </footer>
  )
}