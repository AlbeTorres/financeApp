'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { updateTransactionSchema } from '@/schema'
import { revalidatePath } from 'next/cache'
import { parseResponse } from '../../lib/parseResponse'

type Props = {
  id: string
  amount?: string
  accountId?: string
  categoryId?: string | null
  notes?: string | null
  date?: Date
  payee?: string | undefined
}

export const updateTransaction = async ({
  id,
  amount,
  accountId,
  categoryId,
  notes,
  date,
  payee,
}: Props) => {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    return parseResponse(false, 401, 'unauthorized_user', 'Unauthorized User')
  }

  const validatedFields = updateTransactionSchema.safeParse({
    id,
    amount,
    accountId,
    categoryId,
    notes,
    date,
    payee,
  })

  if (!validatedFields.success) {
    return parseResponse(false, 400, 'invalid_fields', 'Invalid fields!')
  }

  try {
    const transaction = await prisma.transaction.update({
      where: {
        id,
        userId: userId,
      },
      data: {
        id,
        amount,
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

    revalidatePath('/transactions')
    return parseResponse(true, 200, null, 'Account updated succesfully!', transaction)
  } catch (error) {
    console.log(error)
    return parseResponse(false, 500, '', 'Something went wrong')
  }
}
