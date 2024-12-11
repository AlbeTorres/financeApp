import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import Decimal from 'decimal.js'
import { parseResponse } from '../../lib/parseResponse'
import { ActiveDays, fillMissingDays, getTransactionStats } from './utils'

export interface TransactionStats {
  income: Decimal
  expenses: Decimal
  remaining: Decimal
  categories: any
  statsByDay: ActiveDays[]
}

export const getTransactionStatsByPeriod = async (startDate: Date, endDate: Date) => {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    return parseResponse<TransactionStats | null>(
      false,
      401,
      'unauthorized_user',
      'Unauthorized User',
      null
    )
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
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
    })

    const userTransactionStats = getTransactionStats(transactions)
    userTransactionStats.statsByDay = fillMissingDays(
      userTransactionStats.statsByDay,
      startDate,
      endDate
    )

    return parseResponse<TransactionStats | null>(
      true,
      200,
      null,
      'Summary successfully!',
      userTransactionStats
    )
  } catch (error) {
    console.log(error)
    return parseResponse<TransactionStats | null>(false, 500, '', 'Something went wrong', null)
  }
}
