import { TransactionResponse } from '@/interfaces'
import { convertAmountFromMiliunits } from '@/lib/utils'
import { eachDayOfInterval, isSameDay } from 'date-fns'

export interface ActiveDays {
  date: Date
  income: number
  expenses: number
}

export type ExpenseByCategory = Record<string, number>

export function fillMissingDays(activeDays: ActiveDays[], startDate: Date, endDate: Date) {
  if (activeDays.length === 0) {
    return []
  }

  const allDays = eachDayOfInterval({ start: startDate, end: endDate })

  const transactionsByDay = allDays.map(day => {
    const found = activeDays.find(d => isSameDay(d.date, day))

    if (found) {
      return found
    } else {
      return {
        date: day,
        income: 0,
        expenses: 0,
      }
    }
  })

  return transactionsByDay
}

export function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) {
    return previous === current ? 0 : 100
  }

  const percent = ((current - previous) / previous) * 100

  return Math.abs(Math.round(percent))
}

const SAFE_MAX = BigInt(Number.MAX_SAFE_INTEGER)
const SAFE_MIN = BigInt(Number.MIN_SAFE_INTEGER)

function safeBigIntToNumber(value: bigint): number | null {
  if (value > SAFE_MAX || value < SAFE_MIN) {
    console.error('El valor bigint está fuera del rango seguro para un número.')
    return null // Retorna null o lanza un error según tu caso de uso
  }
  return Number(value) // Conversión segura
}

export function getTransactionStats(transactions: TransactionResponse[]) {
  const userTransactionStats = transactions.reduce(
    (accumulator, transaction) => {
      // Parsear a number el monto
      const amount = safeBigIntToNumber(transaction.amount)

      if (amount === null) {
        throw new Error('El monto es demasiado grande para representarlo como número.')
      }
      // Verificar si la transacción tiene una categoría válida
      const categoryName = transaction.category?.name || 'Uncategorized'

      if (amount > 0) {
        // Sumar al ingreso
        accumulator.income = accumulator.income + amount
      } else {
        // Sumar al gasto (ya negativo)
        accumulator.expenses = accumulator.expenses + amount

        // Sumar la cantidad gastada a la categoría correspondiente
        if (!accumulator.categories[categoryName]) {
          accumulator.categories[categoryName] = 0
        }
        accumulator.categories[categoryName] =
          accumulator.categories[categoryName] + convertAmountFromMiliunits(amount)
      }

      // Buscar si ya existe un día registrado en statsByDay
      const existingDay = accumulator.statsByDay.find(
        day => day.date.toISOString().split('T')[0] === transaction.date.toISOString().split('T')[0]
      )

      if (!existingDay) {
        // Si no existe, agregar un nuevo registro para ese día
        accumulator.statsByDay.push({
          date: transaction.date,
          income: amount > 0 ? convertAmountFromMiliunits(amount) : 0,
          expenses: amount > 0 ? 0 : convertAmountFromMiliunits(amount),
        })
      } else {
        // Si existe, actualizar income o expenses según corresponda
        if (amount > 0) {
          existingDay.income = existingDay.income + convertAmountFromMiliunits(amount)
        } else {
          existingDay.expenses = existingDay.expenses + convertAmountFromMiliunits(amount)
        }
      }

      return accumulator // Retornar el acumulador
    },
    {
      income: 0, // Inicializar income con Decimal
      expenses: 0, // Inicializar expenses con Decimal
      remaining: 0, // Inicializar remaining con Decimal
      categories: {} as ExpenseByCategory, // Inicializar categories como un objeto vacío
      statsByDay: [] as ActiveDays[],
    }
  )

  // TODO:Redondear a dos decimales solo al final
  userTransactionStats.expenses = convertAmountFromMiliunits(userTransactionStats.expenses)
  userTransactionStats.income = convertAmountFromMiliunits(userTransactionStats.income)
  userTransactionStats.remaining = userTransactionStats.income + userTransactionStats.expenses

  return userTransactionStats
}
