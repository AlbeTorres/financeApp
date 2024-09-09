// app/api/account/[id]/route.ts
import { getAccountById } from '@/actions/financeApp/get-account-by-id'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    const account = await getAccountById(id)
    return NextResponse.json({ ...account }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Account not found' }, { status: 404 })
  }
}
