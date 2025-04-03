// components/allocation-form.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'

interface Equipment {
  id: string
  name: string
  quantity: number
  status: string
}

interface AllocationFormProps {
  action: (formData: FormData) => Promise<void>
  equipment: Equipment[]
}

export default function AllocationForm({ action, equipment }: AllocationFormProps) {
  const [selectedEquipment, setSelectedEquipment] = useState('')
  
  return (
    <Card>
      <form action={action}>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="equipmentId">Equipment</Label>
            <Select
              name="equipmentId"
              value={selectedEquipment}
              onValueChange={setSelectedEquipment}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select equipment" />
              </SelectTrigger>
              <SelectContent>
                {equipment.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name} ({item.quantity} available)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="recipientName">Recipient Name</Label>
              <Input
                id="recipientName"
                name="recipientName"
                placeholder="Enter recipient's full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipientContact">Contact Number</Label>
              <Input
                id="recipientContact"
                name="recipientContact"
                placeholder="Enter contact number"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="recipientAddress">Address</Label>
            <Textarea
              id="recipientAddress"
              name="recipientAddress"
              placeholder="Enter recipient's address"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="returnDueDate">Return Due Date (Optional)</Label>
              <Input
                id="returnDueDate"
                name="returnDueDate"
                type="date"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Enter any additional notes"
              rows={3}
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/allocations">Cancel</Link>
          </Button>
          <Button type="submit" className="bg-teal-700 hover:bg-teal-800">
            Create Allocation
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}