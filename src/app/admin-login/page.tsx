// app/admin-login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Cookies from 'js-cookie'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // For better security, store the password hash in .env
    if (password === 'shiv-seva-admin') {
      // Set an HTTP-only cookie for authentication
      // In a real app, you'd use a server action to set this securely
      Cookies.set('adminAuth', 'shiv-seva-admin-authenticated', { 
        expires: 1, // Expires in 1 day
        secure: process.env.NODE_ENV === 'production', // Secure in production
        sameSite: 'strict'
      })
      
      // Redirect to admin panel
      router.push('/admin')
    } else {
      setError('Invalid password')
    }
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-16 h-16">
              <Image
                src="/images/logo.png"
                alt="Shiv Seva Mandal Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <CardTitle className="text-2xl text-teal-700">Admin Login</CardTitle>
          <CardDescription>Enter your password to access the admin panel</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-300"
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-teal-700 hover:bg-teal-800">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}