import { getTransactionsById } from '@/actions/financeApp/transactions/get-transaction-by-id'

import { NextResponse } from 'next/server'

export async function GET({ params }: { params: { id: string } }) {
  const { id } = params

  try {
    const transaction = await getTransactionsById(id)
    return NextResponse.json({ ...transaction }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Transaction not found' }, { status: 404 })
  }
}
