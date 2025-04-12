// app/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import HeroSection from '@/components/hero-section'

export default function Home() {
  return (
    <div className="container mx-auto">
      <HeroSection />

      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-teal-700 mb-4">Our Mission</h2>

          <p className="text-lg max-w-3xl mx-auto text-gray-600">
            Shiv Seva Mandal is dedicated to providing free medical equipment to those in need.
            We believe healthcare should be accessible to everyone regardless of financial situation.
          </p>
          
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md border border-teal-100">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-teal-700 text-center mb-2">Free Equipment</h3>
            <p className="text-gray-600 text-center">
              We provide various medical equipment free of charge to those who need it most.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-teal-100">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-teal-700 text-center mb-2">Community Service</h3>
            <p className="text-gray-600 text-center">
              We are committed to supporting our community through compassionate service.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-teal-100">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-teal-700 text-center mb-2">Health Support</h3>
            <p className="text-gray-600 text-center">
              We help patients recover and manage their health conditions through proper equipment access.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button asChild className="bg-teal-700 hover:bg-teal-800">
            <Link href="/dashboard">View Available Equipment</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-teal-700 text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-teal-700 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">Check Availability</h3>
              <p className="text-gray-600">Browse our available medical equipment inventory.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-teal-700 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
              <p className="text-gray-600">Reach out to our team to request the equipment you need.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-teal-700 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Receive Equipment</h3>
              <p className="text-gray-600">Pick up your equipment or arrange for delivery.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-teal-700 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="text-xl font-semibold mb-2">Return When Done</h3>
              <p className="text-gray-600">Return the equipment when you no longer need it.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}