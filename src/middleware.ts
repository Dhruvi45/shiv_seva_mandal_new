// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl
  
  // Check if the path starts with /admin but is not the login page
  if (pathname.startsWith('/admin') && pathname !== '/admin-login') {
    // Check if the admin is authenticated by looking for the adminAuth cookie
    const adminAuth = request.cookies.get('adminAuth')?.value
    
    // If no admin auth cookie or the value doesn't match our expected value
    if (!adminAuth || adminAuth !== 'shiv-seva-admin-authenticated') {
      // Redirect to the admin login page
      return NextResponse.redirect(new URL('/admin-login', request.url))
    }
  }
  
  return NextResponse.next()
}
 
// Configure the middleware to run only on admin routes
export const config = {
  matcher: ['/admin/:path*'],
}