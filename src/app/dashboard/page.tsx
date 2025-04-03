// app/dashboard/page.tsx
import { getAllEquipment } from '@/lib/actions'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function Dashboard() {
  const equipment = await getAllEquipment()
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-teal-700">Available Equipment</h1>
        <p className="text-gray-600 mt-2">Browse our inventory of medical equipment available for those in need</p>
      </div>
      
      {equipment.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No equipment available at the moment. Please check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map((item:any) => (
            <Card key={item.id} className="border border-gray-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-teal-700">{item.name}</CardTitle>
                  <Badge 
                    className={
                      item.status === 'Available' ? 'bg-green-100 text-green-800' :
                      item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
                <CardDescription>Category: {item.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{item.description}</p>
                <p className="mt-2 text-sm text-gray-500">Quantity available: {item.quantity}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full border-teal-700 text-teal-700 hover:bg-teal-50">
                  <Link href="/contact">Request This Item</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      <div className="mt-16 bg-teal-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-teal-700 mb-4">Need Equipment?</h2>
        <p className="text-gray-700 mb-6">
          If you or someone you know needs medical equipment, please feel free to reach out to us. 
          We're here to help our community.
        </p>
        <Button asChild className="bg-teal-700 hover:bg-teal-800">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}