// app/api/account/[id]/route.ts
import { getCategoryById } from '@/actions/financeApp/category/get-category-by-id'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    const category = await getCategoryById(id)
    return NextResponse.json({ ...category }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Account not found' }, { status: 404 })
  }
}
