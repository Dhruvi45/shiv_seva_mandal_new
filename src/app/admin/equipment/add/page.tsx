// app/admin/equipment/add/page.tsx
import { createEquipment } from '@/lib/actions'
import EquipmentForm from '@/components/equipment-form'

export default function AddEquipment() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-teal-700 mb-8">Add New Equipment</h1>
      <EquipmentForm action={createEquipment} />
    </div>
  )
}