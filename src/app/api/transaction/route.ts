import { createTransaction } from '@/actions/financeApp/transactions/create-transaction'
import { deleteTransactions } from '@/actions/financeApp/transactions/delete-transactions'
import { updateTransaction } from '@/actions/financeApp/transactions/update-transaction'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Parsea el cuerpo de la solicitud
    const body = (await req.json()) as {
      amount: number
      accountId: string
      categoryId?: string | null
      notes?: string | null
      date: Date
      payee: string
    }

    const { amount, accountId, categoryId, notes, date, payee } = body

    // Validaciones básicas
    if (!amount || !accountId || !date || !payee) {
      return NextResponse.json(
        { error: 'Required fields are missing: amount, accountId, date, payee' },
        { status: 400 }
      )
    }

    // Llama a la acción de creación de transacción
    const result = await createTransaction(amount, accountId, categoryId, notes, date, payee)

    // Maneja el resultado
    if (result.error) {
      return NextResponse.json({ error: result.message }, { status: result.error_code })
    }

    return NextResponse.json(result.data, { status: 201 })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json(
      {
        error: 'Failed to create transaction',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function PATCH(req: Request) {
  try {
    // Parsea el cuerpo de la solicitud
    const body = (await req.json()) as {
      id: string
      amount: number
      accountId: string
      categoryId?: string | null
      notes?: string | null
      date: Date
      payee: string
    }

    const { id, amount, accountId, categoryId, notes, date, payee } = body

    if (!id) {
      return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 })
    }

    // Validaciones básicas
    if (!amount || !accountId || !date || !payee) {
      return NextResponse.json(
        { error: 'Required fields are missing: amount, accountId, date, payee' },
        { status: 400 }
      )
    }

    // Llama a la acción de creación de transacción
    const result = await updateTransaction({
      id,
      amount,
      accountId,
      categoryId,
      notes,
      date,
      payee,
    })

    // Maneja el resultado
    if (result.error) {
      return NextResponse.json({ error: result.message }, { status: result.error_code })
    }

    return NextResponse.json(result.data, { status: 201 })
  } catch (error) {
    console.error('Error updating transaction:', error)
    return NextResponse.json(
      {
        error: 'Failed to update transaction',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    // Parsea el cuerpo de la solicitud para obtener los IDs
    const body = (await req.json()) as { ids: string[] }

    if (!body.ids || !Array.isArray(body.ids) || body.ids.length === 0) {
      return NextResponse.json({ error: 'An array of IDs is required' }, { status: 400 })
    }

    // Llama a tu acción de eliminar categoría
    const result = await deleteTransactions(body.ids)

    // Maneja el resultado
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ message: 'Transactions deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting transaction:', error)
    return NextResponse.json(
      {
        error: 'Failed to delete transaction',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
