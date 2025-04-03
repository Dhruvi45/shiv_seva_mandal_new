'use client'

import { Button } from '@/components/ui/button'
import { PlusCircle, MinusCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface EquipmentActionsProps {
  id: string
  quantity: number
  incrementAction: (formData: FormData) => Promise<void>
  decrementAction: (formData: FormData) => Promise<void>
}

export default function EquipmentActions({
  id,
  quantity,
  incrementAction,
  decrementAction
}: EquipmentActionsProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleIncrement = async () => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('id', id)
    try {
      await incrementAction(formData)
    } catch (error) {
      console.error('Failed to increment:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDecrement = async () => {
    if (quantity <= 0) return
    
    setIsLoading(true)
    const formData = new FormData()
    formData.append('id', id)
    try {
      await decrementAction(formData)
    } catch (error) {
      console.error('Failed to decrement:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={handleIncrement}
        disabled={isLoading}
      >
        <PlusCircle className="h-5 w-5 text-green-600" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={handleDecrement}
        disabled={isLoading || quantity <= 0}
      >
        <MinusCircle className="h-5 w-5 text-red-600" />
      </Button>
      <Button asChild variant="outline" size="sm" className="border-teal-700 text-teal-700 hover:bg-teal-50">
        <Link href={`/admin/equipment/edit/${id}`}>Edit</Link>
      </Button>
      <Button asChild variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
        <Link href={`/admin/equipment/view/${id}`}>View</Link>
      </Button>
    </div>
  )
}
