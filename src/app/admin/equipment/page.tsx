// app/admin/equipment/page.tsx
'use server'
import { getAllEquipment, incrementEquipmentQuantity, decrementEquipmentQuantity } from '@/lib/actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import EquipmentActions from '@/components/equipment-actions'

export default async function EquipmentManagement() {
  const equipment = await getAllEquipment()
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-teal-700">Equipment Management</h1>
        <Button asChild className="bg-teal-700 hover:bg-teal-800">
          <Link href="/admin/equipment/add">Add New Equipment</Link>
        </Button>
      </div>
      
      {equipment.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">No equipment found. Add some equipment to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left font-semibold text-teal-700">Name</th>
                <th className="py-3 px-4 text-left font-semibold text-teal-700">Category</th>
                <th className="py-3 px-4 text-left font-semibold text-teal-700">Quantity</th>
                <th className="py-3 px-4 text-left font-semibold text-teal-700">Status</th>
                <th className="py-3 px-4 text-left font-semibold text-teal-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipment.map((item:any) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">{item.category}</td>
                  <td className="py-3 px-4">{item.quantity}</td>
                  <td className="py-3 px-4">
                    <Badge 
                      className={
                        item.status === 'Available' ? 'bg-green-100 text-green-800' :
                        item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <EquipmentActions
                      id={item.id}
                      quantity={item.quantity}
                      incrementAction={incrementEquipmentQuantity}
                      decrementAction={decrementEquipmentQuantity}
                    />
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