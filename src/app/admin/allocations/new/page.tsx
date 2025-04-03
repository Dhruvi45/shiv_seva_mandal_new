// app/admin/allocations/new/page.tsx
import { getAllEquipment, createAllocation } from '@/lib/actions'
import AllocationForm from '@/components/allocation-form'

export default async function NewAllocation() {
  const equipment = await getAllEquipment()
  const availableEquipment = equipment
    .filter(item => item.status !== 'Unavailable' && item.quantity > 0)
    .map(item => ({
      ...item,
      quantity: item.quantity, // Use the existing 'quantity' property
      status: item.status || 'Unknown', // Use the existing 'status' property
    }))
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-teal-700 mb-8">New Allocation</h1>
      {availableEquipment.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-yellow-700 mb-2">No Available Equipment</h2>
          <p className="text-yellow-700">
            There is no equipment available for allocation. Please add new equipment or wait for returns.
          </p>
        </div>
      ) : (
        <AllocationForm action={createAllocation} equipment={availableEquipment} />
      )}
    </div>
  )
}