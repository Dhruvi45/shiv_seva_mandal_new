// lib/auth-actions.ts
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Action to logout admin user
export async function logoutAdmin() {
  // Delete the admin auth cookie
  (await
        // Delete the admin auth cookie
        cookies()).delete('adminAuth')
  // Redirect to home page
  redirect('/')
}

// Function to check if user is admin (for components that need to know)
export async function checkIsAdmin() {
  const adminCookie = (await cookies()).get('adminAuth')
  return adminCookie?.value === 'shiv-seva-admin-authenticated'
}