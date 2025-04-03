// app/admin/page.tsx
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-teal-700 mb-8">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Link href="/admin/equipment">
          <Card className="hover:border-teal-700 cursor-pointer transition-all">
            <CardHeader>
              <CardTitle className="text-teal-700">Equipment Management</CardTitle>
              <CardDescription>Manage medical equipment inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Add, edit, and manage your equipment inventory. Track quantities and availability status.</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/admin/allocations">
          <Card className="hover:border-teal-700 cursor-pointer transition-all">
            <CardHeader>
              <CardTitle className="text-teal-700">Allocation Management</CardTitle>
              <CardDescription>Manage equipment allocations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Track who has received equipment, manage returns, and monitor equipment distribution.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      <div className="mt-12 bg-teal-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-teal-700 mb-4">Admin Quick Tips</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• Equipment with quantity 0 will automatically be marked as "Unavailable"</li>
          <li>• Equipment with quantity below 5 will be marked as "Low Stock"</li>
          <li>• When equipment is allocated, its quantity decreases by 1</li>
          <li>• When equipment is returned, its quantity increases by 1</li>
          <li>• Remember to check for overdue returns regularly</li>
        </ul>
      </div>
    </div>
  )
}