import { getEquipmentById, updateEquipment } from '@/lib/actions'
import EquipmentForm from '@/components/equipment-form'
import { notFound } from 'next/navigation'

export default async function EditEquipment({ params }: { params: { id: string } }) {
  const equipment = await getEquipmentById(params.id)
  
  if (!equipment) {
    notFound()
  }
  
  const updateEquipmentWithId = async (formData: FormData) => {
    'use server'
    await updateEquipment(params.id, formData)
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-teal-700 mb-8">Edit Equipment</h1>
      <EquipmentForm 
        action={updateEquipmentWithId} 
        defaultValues={equipment} 
      />
    </div>
  )
}
