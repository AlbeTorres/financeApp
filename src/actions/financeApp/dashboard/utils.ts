import { eachDayOfInterval, isSameDay } from 'date-fns'
import Decimal from 'decimal.js'

export interface ActiveDays {
  date: Date
  income: Decimal
  expenses: Decimal
}

interface Transaction {
  id: string
  amount: string
  payee: string | null
  notes: string | null
  date: Date
  accountId: string
  categoryId: string | null
  userId: string
  category: {
    id: string
    name: string
  } | null
  account: {
    id: string
    name: string
  }
}

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
        income: new Decimal(0),
        expenses: new Decimal(0),
      }
    }
  })

  return transactionsByDay
}

export function calculatePercentageChange(current: Decimal, previous: Decimal) {
  if (previous.equals(0)) {
    return previous.equals(current) ? 0 : 100
  }
  return current.minus(previous).dividedBy(previous).plus(100)
}

export function getTransactionStats(transactions: Transaction[]) {
  const userTransactionStats = transactions.reduce(
    (accumulator, transaction) => {
      const amount = new Decimal(transaction.amount) // Crear un Decimal con el monto

      // Verificar si la transacción tiene una categoría válida
      const categoryName = transaction.category?.name || 'Uncategorized'

      if (amount.gt(0)) {
        // Sumar al ingreso
        accumulator.income = accumulator.income.plus(amount)
      } else {
        // Sumar al gasto (ya negativo)
        accumulator.expenses = accumulator.expenses.plus(amount)

        // Sumar la cantidad gastada a la categoría correspondiente
        if (!accumulator.categories[categoryName]) {
          accumulator.categories[categoryName] = new Decimal(0)
        }
        accumulator.categories[categoryName] = accumulator.categories[categoryName].plus(amount)
      }

      // Buscar si ya existe un día registrado en statsByDay
      const existingDay = accumulator.statsByDay.find(
        day => day.date.toISOString().split('T')[0] === transaction.date.toISOString().split('T')[0]
      )

      if (!existingDay) {
        // Si no existe, agregar un nuevo registro para ese día
        accumulator.statsByDay.push({
          date: transaction.date,
          income: amount.gt(0) ? amount : new Decimal(0),
          expenses: amount.gt(0) ? new Decimal(0) : amount,
        })
      } else {
        // Si existe, actualizar income o expenses según corresponda
        if (amount.gt(0)) {
          existingDay.income = existingDay.income.plus(amount)
        } else {
          existingDay.expenses = existingDay.expenses.plus(amount)
        }
      }

      return accumulator // Retornar el acumulador
    },
    {
      income: new Decimal(0), // Inicializar income con Decimal
      expenses: new Decimal(0), // Inicializar expenses con Decimal
      remaining: new Decimal(0), // Inicializar remaining con Decimal
      categories: {} as any, // Inicializar categories como un objeto vacío
      statsByDay: [] as ActiveDays[],
    }
  )

  // Redondear a dos decimales solo al final
  userTransactionStats.income = userTransactionStats.income.toDecimalPlaces(2)
  userTransactionStats.expenses = userTransactionStats.expenses.toDecimalPlaces(2)
  userTransactionStats.remaining = userTransactionStats.income
    .plus(userTransactionStats.expenses)
    .toDecimalPlaces(2)

  return userTransactionStats
}
