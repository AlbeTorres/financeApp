import { createAccount } from '@/actions/financeApp/account/create-account'
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

export async function POST(req: Request) {
  try {
    // Parsea el cuerpo de la solicitud
    const body = await req.json()

    // Valida los datos de entrada
    const { name, type, balance } = body

    // Validaciones básicas
    if (!name) {
      return NextResponse.json({ error: 'Account name is required' }, { status: 400 })
    }

    // Llama a tu función de crear cuenta
    const result = await createAccount({
      name,
      // type, // Opcional, dependiendo de tu implementación
      // balance, // Opcional, dependiendo de tu implementación
    })

    // Maneja el resultado
    if (result.error !== null) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    // Devuelve la cuenta creada
    return NextResponse.json(result.data, { status: 201 })
  } catch (error) {
    console.error('Error creating account:', error)
    return NextResponse.json(
      {
        error: 'Failed to create account',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
