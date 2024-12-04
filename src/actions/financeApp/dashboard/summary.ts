'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import Decimal from 'decimal.js'
import { revalidatePath } from 'next/cache'
import { parseResponse } from '../../lib/parseResponse'

export const getSummary = async (startDate?: Date, endDate?: Date) => {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    return parseResponse(false, 401, 'unauthorized_user', 'Unauthorized User')
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

    // const userTransactionStats = transactions.reduce(
    //   (accumulator, transaction) => {
    //     const amount = parseFloat(transaction.amount)

    //     if (amount > 0) {
    //       accumulator.income += amount // Sumar al ingreso
    //     } else {
    //       accumulator.expenses += amount // Sumar al gasto
    //     }

    //     return accumulator // Retornar acumulador para la próxima iteración
    //   },
    //   { income: 0, expenses: 0, remaining: 0 }
    // )

    // userTransactionStats.income = parseFloat(userTransactionStats.income.toFixed(2))
    // userTransactionStats.expenses = parseFloat(userTransactionStats.expenses.toFixed(2))
    // userTransactionStats.remaining = parseFloat(
    //   (userTransactionStats.income + userTransactionStats.expenses).toFixed(2)
    // )

    const userTransactionStats = transactions.reduce(
      (accumulator, transaction) => {
        const amount = new Decimal(transaction.amount) // Crear un Decimal con el monto

        if (amount.gt(0)) {
          accumulator.income = accumulator.income.plus(amount) // Sumar al ingreso
        } else {
          accumulator.expenses = accumulator.expenses.plus(amount) // Sumar al gasto (ya negativo)
        }

        return accumulator // Retornar el acumulador
      },
      {
        income: new Decimal(0), // Inicializar income con Decimal
        expenses: new Decimal(0), // Inicializar expenses con Decimal
        remaining: new Decimal(0), // Inicializar remaining con Decimal
      }
    )

    // Redondear a dos decimales solo al final
    userTransactionStats.income = userTransactionStats.income.toDecimalPlaces(2)
    userTransactionStats.expenses = userTransactionStats.expenses.toDecimalPlaces(2)
    userTransactionStats.remaining = userTransactionStats.income
      .plus(userTransactionStats.expenses)
      .toDecimalPlaces(2)

    revalidatePath('/dashboard')

    return parseResponse(true, 200, null, 'Summary successfully!', userTransactionStats)
  } catch (error) {
    console.log(error)
    return parseResponse(false, 500, '', 'Something went wrong')
  }
}
