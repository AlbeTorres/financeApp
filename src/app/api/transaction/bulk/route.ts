// app/api/transactions/route.ts
import { createTransactionsBulk } from '@/actions/financeApp/transactions/create-transaction-bulk'
import { NextResponse } from 'next/server'
// Ruta correcta a tu archivo donde está la función
import { z } from 'zod'

// Definir el esquema para validar el cuerpo de la solicitud (opcional pero recomendable)
const transactionsSchema = z.array(
  z.object({
    amount: z.number(),
    accountId: z.string(),
    categoryId: z.string().nullable(),
    notes: z.string().nullable(),
    date: z.date(), // O puede ser un tipo Date si lo prefieres
    payee: z.string(),
  })
)

export async function POST(req: Request) {
  try {
    // Parsear el cuerpo de la solicitud
    const body = await req.json()

    // Validar las transacciones
    const parsedData = transactionsSchema.safeParse(body)

    if (!parsedData.success) {
      return NextResponse.json(
        { message: 'Invalid data format', errors: parsedData.error.errors },
        { status: 400 }
      )
    }

    // Llamar a la función para crear las transacciones en bulk
    const result = await createTransactionsBulk(parsedData.data)

    if (result.error) {
      return NextResponse.json(result, { status: result.error_code })
    }

    // Si todo sale bien
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Error processing transactions:', error)
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
