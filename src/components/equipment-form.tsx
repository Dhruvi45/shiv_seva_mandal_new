// components/equipment-form.tsx
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

interface EquipmentFormProps {
  action: (formData: FormData) => Promise<void>
  defaultValues?: {
    id?: string
    name?: string
    description?: string
    quantity?: number
    category?: string
    status?: string
  }
}

export default function EquipmentForm({ action, defaultValues }: EquipmentFormProps) {
  const [name, setName] = useState(defaultValues?.name || '')
  const [description, setDescription] = useState(defaultValues?.description || '')
  const [quantity, setQuantity] = useState(defaultValues?.quantity?.toString() || '1')
  const [category, setCategory] = useState(defaultValues?.category || '')
  const [status, setStatus] = useState(defaultValues?.status || 'Available')
  
  const equipment_categories = [
    'Mobility Aid',
    'Respiratory',
    'Hospital Bed',
    'Bathroom Safety',
    'Daily Living',
    'Orthopedic',
    'Monitoring Device',
    'Other'
  ]
  
  return (
    <Card>
      <form action={action}>
        {defaultValues?.id && (
          <input type="hidden" name="id" value={defaultValues.id} />
        )}
        
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Equipment Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter equipment name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                name="category"
                value={category}
                onValueChange={setCategory}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {equipment_categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter equipment description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                value={status}
                onValueChange={setStatus}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/equipment">Cancel</Link>
          </Button>
          <Button type="submit" className="bg-teal-700 hover:bg-teal-800">
            {defaultValues ? 'Update Equipment' : 'Add Equipment'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}