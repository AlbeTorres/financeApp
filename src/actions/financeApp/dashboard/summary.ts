'use server'
import { auth } from '@/auth'
import { differenceInDays, parse, subDays } from 'date-fns'
import { parseResponse } from '../../lib/parseResponse'
import { getTransactionStatsByPeriod } from './getTransactionStatsByPeriod '
import { ActiveDays, calculatePercentageChange } from './utils'

export interface CategoriesExpenses {
  name: string
  value: number
  percent: number
}
export interface SummaryResponse {
  remainingAmount: number
  remainingChange: number
  incomeAmount: number
  incomeChange: number
  expensesAmount: number
  expensesChange: number
  categories: CategoriesExpenses[]
  days: ActiveDays[]
}

export const getSummary = async (from?: string, to?: string) => {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    return parseResponse<SummaryResponse | null>(
      false,
      401,
      'unauthorized_user',
      'Unauthorized User'
    )
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

    const categoriesExpenses = Object.entries(currentPeriod.data.categories).map(entry => {
      const percent = Math.abs((entry[1] * 100) / currentPeriod!.data!.expenses)

      return { name: entry[0], value: Math.abs(entry[1]), percent }
    })

    return parseResponse<SummaryResponse>(true, 200, null, 'Summary successfully!', {
      remainingAmount: Math.round(currentPeriod.data.remaining * 100) / 100,
      remainingChange,
      incomeAmount: currentPeriod.data.income,
      incomeChange,
      expensesAmount: currentPeriod.data.expenses,
      expensesChange,
      categories: categoriesExpenses,
      days: currentPeriod.data.statsByDay,
    })
  } else {
    return parseResponse<SummaryResponse | null>(true, 500, null, 'Something went wrong', null)
  }
}
