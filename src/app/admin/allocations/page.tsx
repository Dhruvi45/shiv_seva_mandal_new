// app/admin/allocations/page.tsx
import { getAllAllocations } from '@/lib/actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

export default async function AllocationManagement() {
  const allocations = await getAllAllocations()
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-teal-700">Allocation Management</h1>
        <Button asChild className="bg-teal-700 hover:bg-teal-800">
          <Link href="/admin/allocations/new">New Allocation</Link>
        </Button>
      </div>
      
      {allocations.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">No allocations found. Create a new allocation to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left font-semibold text-teal-700">Recipient</th>
                <th className="py-3 px-4 text-left font-semibold text-teal-700">Equipment</th>
                <th className="py-3 px-4 text-left font-semibold text-teal-700">Allocated On</th>
                <th className="py-3 px-4 text-left font-semibold text-teal-700">Due Date</th>
                <th className="py-3 px-4 text-left font-semibold text-teal-700">Status</th>
                <th className="py-3 px-4 text-left font-semibold text-teal-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map((allocation:any) => (
                <tr key={allocation.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{allocation.recipientName}</td>
                  <td className="py-3 px-4">{allocation.equipment.name}</td>
                  <td className="py-3 px-4">{formatDate(allocation.allocatedOn)}</td>
                  <td className="py-3 px-4">{allocation.returnDueDate ? formatDate(allocation.returnDueDate) : 'N/A'}</td>
                  <td className="py-3 px-4">
                    <Badge 
                      className={
                        allocation.status === 'Allocated' ? 'bg-blue-100 text-blue-800' :
                        allocation.status === 'Returned' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }
                    >
                      {allocation.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <Button asChild variant="outline" size="sm" className="border-teal-700 text-teal-700 hover:bg-teal-50">
                      <Link href={`/admin/allocations/view/${allocation.id}`}>View</Link>
                    </Button>
                    {allocation.status === 'Allocated' && (
                      <form action={async () => {
                        'use server'
                        const { markAllocationReturned } = await import('@/lib/actions')
                        await markAllocationReturned(allocation.id)
                      }}>
                        <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700">
                          Mark Returned
                        </Button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}