import { createCategory } from '@/actions/financeApp/category/create-category'
import { deleteCategories } from '@/actions/financeApp/category/delete-categories'
import { getCategoriesByUser } from '@/actions/financeApp/category/get-categories-by-user'
import { updateCategory } from '@/actions/financeApp/category/update-category'
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
    const categories = await getCategoriesByUser(limit, offset)
    return NextResponse.json(categories, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch accounts' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    // Parsea el cuerpo de la solicitud
    const body = (await req.json()) as { name: string }

    // Valida los datos de entrada
    const { name } = body

    // Validaciones básicas
    if (!name) {
      return NextResponse.json({ error: 'Account name is required' }, { status: 400 })
    }

    // Llama a tu función de crear categoria
    const result = await createCategory({
      name,
    })

    // Maneja el resultado
    if (result.error !== null) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    // Devuelve la categoria creada
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

export async function DELETE(req: Request) {
  try {
    // Parsea el cuerpo de la solicitud para obtener los IDs
    const body = (await req.json()) as { ids: string[] }

    if (!body.ids || !Array.isArray(body.ids) || body.ids.length === 0) {
      return NextResponse.json({ error: 'An array of IDs is required' }, { status: 400 })
    }

    // Llama a tu acción de eliminar categoría
    const result = await deleteCategories(body.ids)

    // Maneja el resultado
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      {
        error: 'Failed to delete category',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function PATCH(req: Request) {
  try {
    const body = (await req.json()) as { id: string; name?: string }

    const { id, name } = body

    // Validaciones básicas
    if (!id) {
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 })
    }
    if (!name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 })
    }

    // Llama a tu acción de actualizar categoría
    const result = await updateCategory({ id, name })

    // Maneja el resultado
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json(result.data, { status: 200 })
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      {
        error: 'Failed to update category',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
