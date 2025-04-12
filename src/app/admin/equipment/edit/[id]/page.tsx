import { getEquipmentById, updateEquipment } from '@/lib/actions'
import EquipmentForm from '@/components/equipment-form'
import { notFound } from 'next/navigation'

export default async function EditEquipment({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const equipment = await getEquipmentById(id)
  
  if (!equipment) {
    notFound()
  }
  
  const updateEquipmentWithId = async (formData: FormData) => {
    'use server'
    await updateEquipment(id, formData)
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
