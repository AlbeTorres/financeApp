import { parseTransactions } from '@/actions/lib/parseTransaction'
import { auth } from '@/auth'
import { Transaction } from '@/interfaces'
import prisma from '@/lib/prisma'
import { parse, subDays } from 'date-fns'
import { parseResponse } from '../../lib/parseResponse'

export const getTransactionsByUser = async (from?: string, to?: string, accountId?: string) => {
  try {
    const session = await auth()
    const userId = session?.user.id

    if (!userId) {
      return parseResponse<Transaction[]>(false, 401, 'unauthorized_user', 'Unauthorized User')
    }

    const defaultTo = new Date()

    const defaultFrom = subDays(defaultTo, 30)

    const startDate = from ? parse(from, 'yyyy-mm-dd', new Date()) : defaultFrom

    const endDate = to ? parse(to, 'yyyy-mm-dd', new Date()) : defaultTo

    const transactions = await prisma.transaction.findMany({
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
        accountId,
        userId,
        //TODO:REVIZAR COMO Manejar el filtrado por fechas, hacer que filtre por transacciones en el mes, en lugar de 30 dias atras de la fecha actual
        // date: {
        //   gte: new Date(startDate),
        //   lte: new Date(endDate),
        // },
      },
    })

    return parseResponse<Transaction[]>(
      true,
      200,
      null,
      'Transactions retrieved successfully!',
      parseTransactions(transactions)
    )
  } catch (error) {
    console.log(error)
    return parseResponse<Transaction[]>(false, 500, '', 'Something went wrong')
  }
}
