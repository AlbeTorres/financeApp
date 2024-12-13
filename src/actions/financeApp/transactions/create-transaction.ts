'use server'

import { auth } from '@/auth'
import { CreateOrUpdateTransactionResponse } from '@/interfaces'
import prisma from '@/lib/prisma'
import { convertAmountToMiliunits } from '@/lib/utils'
import { insertTransactionSchema } from '@/schema'
import { revalidatePath } from 'next/cache'
import { parseResponse } from '../../lib/parseResponse'

export const createTransaction = async (
  amount: number,
  accountId: string,
  categoryId: string | undefined | null,
  notes: string | undefined | null,
  date: Date,
  payee: string
) => {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    return parseResponse<CreateOrUpdateTransactionResponse>(
      false,
      401,
      'unauthorized_user',
      'Unauthorized User'
    )
  }

  const validatedFields = insertTransactionSchema.safeParse({
    amount,
    accountId,
    categoryId,
    notes,
    date,
    payee,
  })

  if (!validatedFields.success) {
    return parseResponse<CreateOrUpdateTransactionResponse>(
      false,
      400,
      'invalid_fields',
      'Invalid fields!'
    )
  }

  try {
    const transaction = await prisma.transaction.create({
      data: {
        userId,
        amount: convertAmountToMiliunits(amount),
        accountId,
        categoryId,
        notes,
        date,
        payee,
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

    console.log()
    revalidatePath('/transactions')

    return parseResponse<CreateOrUpdateTransactionResponse>(
      true,
      200,
      null,
      'Transaction created successfully!',
      transaction
    )
  } catch (error) {
    console.log(error)
    return parseResponse<CreateOrUpdateTransactionResponse>(false, 500, '', 'Something went wrong')
  }
}
