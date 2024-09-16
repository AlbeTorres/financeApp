'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { parseResponse } from '../../lib/parseResponse'

export const deleteTransactions = async (deleteList: string[]) => {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    return parseResponse(false, 401, 'unauthorized_user', 'Unauthorized User')
  }

  try {
    const transactions = await prisma.transaction.deleteMany({
      where: {
        id: {
          in: deleteList, // Filtra los IDs presentes en deleteList
        },
        userId: userId,
      },
    })

    revalidatePath('/transactions')

    return parseResponse(true, 200, null, 'Transactions deleted succesfully!', transactions)
  } catch (error) {
    console.log(error)
    return parseResponse(false, 500, '', 'Something went wrong')
  }
}
