'use server'
import { auth } from '@/auth'
import { differenceInDays, parse, subDays } from 'date-fns'
import { revalidatePath } from 'next/cache'
import { parseResponse } from '../../lib/parseResponse'
import { getTransactionStatsByPeriod, TransactionStats } from './getTransactionStatsByPeriod '
import { calculatePercentageChange } from './utils'

export const getSummary = async (from?: string, to?: string) => {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    return parseResponse(false, 401, 'unauthorized_user', 'Unauthorized User')
  }

  const defaulTo = new Date()
  const defaulFrom = subDays(defaulTo, 30)

  const startDate = from ? parse(from, 'yyyy-MM-dd', new Date()) : defaulFrom
  const endDate = to ? parse(to, 'yyyy-MM-dd', new Date()) : defaulTo

  const periodLength = differenceInDays(endDate, startDate)
  const lastPeriodStart = subDays(startDate, periodLength)
  const lastPeriodEnd = subDays(endDate, periodLength)

  const currentPeriod = await getTransactionStatsByPeriod(startDate, endDate)
  const lastPeriod = await getTransactionStatsByPeriod(lastPeriodStart, lastPeriodEnd)

  if (currentPeriod.data && lastPeriod.data) {
    const incomeChange = calculatePercentageChange(
      currentPeriod.data.income,
      lastPeriod.data.income
    )
    const expensesChange = calculatePercentageChange(
      currentPeriod.data.expenses,
      lastPeriod.data.expenses
    )
    const remainingChange = calculatePercentageChange(
      currentPeriod.data.remaining,
      lastPeriod.data.remaining
    )

    revalidatePath('/dashboard')
  } else {
    return parseResponse<TransactionStats | null>(true, 500, null, 'Something went wrong', null)
  }
}
