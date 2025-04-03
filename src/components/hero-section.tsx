//  components/hero-section.tsx
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="bg-teal-50 py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-700 mb-4">
            Helping Hands for Health
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Shiv Seva Mandal provides free medical equipment to those in need. Our mission is to make healthcare accessible to everyone.
          </p>
          <div className="flex gap-4">
            <Button asChild className="bg-teal-700 hover:bg-teal-800">
              <Link href="/dashboard">View Equipment</Link>
            </Button>
            <Button asChild variant="outline" className="border-teal-700 text-teal-700 hover:bg-teal-50">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64">
            <Image
              src="/images/logo.png"
              alt="Shiv Seva Mandal Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}