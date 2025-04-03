// lib/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import prisma from './prisma'

// Equipment Actions
export async function getAllEquipment() {
  try {
    return await prisma.equipment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
  } catch (error) {
    console.error('Failed to fetch equipment:', error)
    return []
  }
}

export async function getEquipmentById(id: string) {
  try {
    return await prisma.equipment.findUnique({
      where: { id },
    })
  } catch (error) {
    console.error(`Failed to fetch equipment with ID ${id}:`, error)
    return null
  }
}

export async function createEquipment(formData: FormData) {
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const quantity = parseInt(formData.get('quantity') as string)
  const category = formData.get('category') as string
  const status = formData.get('status') as string

  try {
    await prisma.equipment.create({
      data: {
        name,
        description,
        quantity,
        category,
        status,
      },
    })
    
    redirect('/admin/equipment')
    // revalidatePath('/admin/equipment')
  } catch (error) {
    console.error('Failed to create equipment:', error)
    throw new Error('Failed to create equipment')
  }
}

export async function updateEquipment(id: string, formData: FormData) {
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const quantity = parseInt(formData.get('quantity') as string)
  const category = formData.get('category') as string
  const status = formData.get('status') as string

  try {
    await prisma.equipment.update({
      where: { id },
      data: {
        name,
        description,
        quantity,
        category,
        status,
      },
    })
    
    revalidatePath('/admin/equipment')
    redirect('/admin/equipment')
  } catch (error) {
    console.error(`Failed to update equipment with ID ${id}:`, error)
    throw new Error('Failed to update equipment')
  }
}

export async function incrementEquipmentQuantity(formData: FormData) {
  const id = formData.get('id') as string
  
  try {
    const equipment = await prisma.equipment.findUnique({
      where: { id },
    })

    if (!equipment) {
      throw new Error('Equipment not found')
    }

    const newQuantity = equipment.quantity + 1
    
    await prisma.equipment.update({
      where: { id },
      data: {
        quantity: newQuantity,
        status: newQuantity > 0 ? (newQuantity < 5 ? 'Low Stock' : 'Available') : 'Unavailable',
      },
    })
    
    revalidatePath('/admin/equipment')
  } catch (error) {
    console.error(`Failed to increment equipment quantity with ID ${id}:`, error)
    throw new Error('Failed to update equipment quantity')
  }
}

export async function decrementEquipmentQuantity(formData: FormData) {
  const id = formData.get('id') as string
  
  try {
    const equipment = await prisma.equipment.findUnique({
      where: { id },
    })

    if (!equipment) {
      throw new Error('Equipment not found')
    }

    if (equipment.quantity <= 0) {
      throw new Error('Equipment quantity already at zero')
    }

    const newQuantity = equipment.quantity - 1
    
    await prisma.equipment.update({
      where: { id },
      data: {
        quantity: newQuantity,
        status: newQuantity <= 0 ? 'Unavailable' : newQuantity < 5 ? 'Low Stock' : 'Available',
      },
    })
    
    revalidatePath('/admin/equipment')
  } catch (error) {
    console.error(`Failed to decrement equipment quantity with ID ${id}:`, error)
    throw new Error('Failed to update equipment quantity')
  }
}

// Allocation Actions
export async function getAllAllocations() {
  try {
    return await prisma.allocation.findMany({
      include: {
        equipment: true,
      },
      orderBy: {
        allocatedOn: 'desc',
      },
    })
  } catch (error) {
    console.error('Failed to fetch allocations:', error)
    return []
  }
}

export async function getAllocationById(id: string) {
  try {
    return await prisma.allocation.findUnique({
      where: { id },
      include: {
        equipment: true,
      },
    })
  } catch (error) {
    console.error(`Failed to fetch allocation with ID ${id}:`, error)
    return null
  }
}

export async function createAllocation(formData: FormData) {
  const equipmentId = formData.get('equipmentId') as string
  const recipientName = formData.get('recipientName') as string
  const recipientContact = formData.get('recipientContact') as string
  const recipientAddress = formData.get('recipientAddress') as string
  const returnDueDate = formData.get('returnDueDate') ? new Date(formData.get('returnDueDate') as string) : null
  const notes = formData.get('notes') as string

  try {
    // Check if equipment is available
    const equipment = await prisma.equipment.findUnique({
      where: { id: equipmentId },
    })

    if (!equipment || equipment.quantity <= 0 || equipment.status === 'Unavailable') {
      throw new Error('Equipment not available for allocation')
    }

    // Create allocation
    await prisma.allocation.create({
      data: {
        equipmentId,
        recipientName,
        recipientContact,
        recipientAddress,
        returnDueDate,
        status: 'Allocated',
        notes,
      },
    })

    // Update equipment quantity and status
    await prisma.equipment.update({
      where: { id: equipmentId },
      data: {
        quantity: equipment.quantity - 1,
        status: equipment.quantity - 1 <= 0 ? 'Unavailable' : equipment.quantity - 1 < 5 ? 'Low Stock' : 'Available',
      },
    })
    
    revalidatePath('/admin/allocations')
    redirect('/admin/allocations')
  } catch (error) {
    console.error('Failed to create allocation:', error)
    throw new Error('Failed to create allocation')
  }
}

export async function markAllocationReturned(id: string) {
  try {
    const allocation = await prisma.allocation.findUnique({
      where: { id },
      include: {
        equipment: true,
      },
    })

    if (!allocation) {
      throw new Error('Allocation not found')
    }

    // Update allocation status
    await prisma.allocation.update({
      where: { id },
      data: {
        status: 'Returned',
        returnedOn: new Date(),
      },
    })

    // Update equipment quantity and status
    await prisma.equipment.update({
      where: { id: allocation.equipmentId },
      data: {
        quantity: allocation.equipment.quantity + 1,
        status: allocation.equipment.quantity + 1 > 0 ? 'Available' : allocation.equipment.status,
      },
    })
    
    revalidatePath('/admin/allocations')
  } catch (error) {
    console.error(`Failed to mark allocation with ID ${id} as returned:`, error)
    throw new Error('Failed to mark allocation as returned')
  }
}
