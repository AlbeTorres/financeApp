import { getAccountsByUser } from '@/actions/financeApp/account/get-accounts-by-user'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  let limit = undefined
  let offset = undefined

  if (searchParams.get('limit') !== null) {
    limit = parseInt(searchParams.get('limit') || '10', 10)
  }

  if (searchParams.get('offset') !== null) {
    offset = parseInt(searchParams.get('offset') || '0', 10)
  }

  try {
    const accounts = await getAccountsByUser(limit, offset)
    return NextResponse.json(accounts, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch accounts' }, { status: 500 })
  }
}
