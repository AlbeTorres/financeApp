import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import Decimal from 'decimal.js'
import { parseResponse } from '../../lib/parseResponse'

export interface TransactionStats {
  income: Decimal
  expenses: Decimal
  remaining: Decimal
}

export const getTransactionStatsByPeriod = async (startDate?: Date, endDate?: Date) => {
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

          // Sumar la cantidad a la categoría correspondiente
          if (!accumulator.categories[categoryName]) {
            accumulator.categories[categoryName] = new Decimal(0)
          }
          accumulator.categories[categoryName] = accumulator.categories[categoryName].plus(amount)
        }

        return accumulator // Retornar el acumulador
      },
      {
        income: new Decimal(0), // Inicializar income con Decimal
        expenses: new Decimal(0), // Inicializar expenses con Decimal
        remaining: new Decimal(0), // Inicializar remaining con Decimal
        categories: {} as any, // Inicializar categories como un objeto vacío
      }
    )

    // Redondear a dos decimales solo al final
    userTransactionStats.income = userTransactionStats.income.toDecimalPlaces(2)
    userTransactionStats.expenses = userTransactionStats.expenses.toDecimalPlaces(2)
    userTransactionStats.remaining = userTransactionStats.income
      .plus(userTransactionStats.expenses)
      .toDecimalPlaces(2)

    console.log(userTransactionStats)

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
