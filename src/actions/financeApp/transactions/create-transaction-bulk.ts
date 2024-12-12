'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { convertAmountToMiliunits } from '@/lib/utils'
import { insertTransactionSchema } from '@/schema'
import { revalidatePath } from 'next/cache'
import { parseResponse } from '../../lib/parseResponse'

export const createTransactionsBulk = async (
  transactions: Array<{
    amount: number
    accountId: string
    categoryId?: string | null
    notes?: string | null
    date: Date
    payee: string
  }>
) => {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    return parseResponse(false, 401, 'unauthorized_user', 'Unauthorized User')
  }

  // Validar todas las transacciones
  const errors: Array<{ index: number; error: string }> = []
  const validatedTransactions = transactions.map((transaction, index) => {
    const validationResult = insertTransactionSchema.safeParse(transaction)
    if (!validationResult.success) {
      errors.push({ index, error: 'Invalid fields in transaction' })
    }
    return validationResult.success ? validationResult.data : null
  })

  // Filtrar las transacciones válidas
  const validTransactions = validatedTransactions.filter(t => t !== null)

  if (errors.length > 0) {
    return parseResponse(false, 400, 'invalid_fields', 'Some transactions are invalid', { errors })
  }

  try {
    // Crear las transacciones en bulk
    const createdTransactions = await prisma.$transaction(
      validTransactions.map(transaction =>
        prisma.transaction.create({
          data: {
            ...transaction,
            amount: convertAmountToMiliunits(transaction.amount),
            userId,
          },
          select: {
            id: true,
            userId: true,
            amount: true,
            accountId: true,
            categoryId: true,
            notes: true,
            date: true,
          },
        })
      )
    )

    revalidatePath('/transactions')

    return parseResponse<any>(
      true,
      200,
      null,
      `${createdTransactions.length} transactions created successfully!`,
      createdTransactions
    )
  } catch (error) {
    console.error('Error creating transactions in bulk:', error)
    return parseResponse(false, 500, '', 'Something went wrong')
  }
}
