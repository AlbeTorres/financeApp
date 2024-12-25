import { parseTransaction } from '@/actions/lib/parseTransaction'
import { auth } from '@/auth'
import { Transaction } from '@/interfaces'
import prisma from '@/lib/prisma'
import { parseResponse } from '../../lib/parseResponse'

export const getTransactionsById = async (id: string) => {
  try {
    const session = await auth()
    const userId = session?.user.id

    if (!userId) {
      return parseResponse<Transaction>(false, 401, 'unauthorized_user', 'Unauthorized User')
    }

    const transaction = await prisma.transaction.findFirst({
      include: {
        category: {
          select: {
            name: true,
            id: true,
          },
        },
        account: {
          select: {
            name: true,
            id: true,
          },
        },
      },
      where: {
        userId,
        id,
      },
    })

    if (transaction !== null) {
      return parseResponse<Transaction>(
        true,
        200,
        null,
        'Transaction retrieved successfully!',
        parseTransaction(transaction)
      )
    }

    return parseResponse<Transaction>(false, 404, '', 'Transaction not found')
  } catch (error) {
    console.log(error)
    return parseResponse<Transaction>(false, 500, '', 'Something went wrong')
  }
}
