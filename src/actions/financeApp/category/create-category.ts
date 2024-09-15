'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { insertCategorySchema } from '@/schema'
import { revalidatePath } from 'next/cache'
import * as z from 'zod'
import { parseResponse } from '../../lib/parseResponse'

export const createCategory = async ({ name }: z.infer<typeof insertCategorySchema>) => {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    return parseResponse(false, 401, 'unauthorized_user', 'Unauthorized User')
  }

  const validatedFields = insertCategorySchema.safeParse({ name })

  if (!validatedFields.success) {
    return parseResponse(false, 400, 'invalid_fields', 'Invalid fields!')
  }

  try {
    const category = await prisma.category.create({
      data: {
        name,
        userId,
      },
      select: {
        id: true,
        name: true,
      },
    })
    revalidatePath('/categories')

    return parseResponse(true, 200, null, 'Category created successfully!', category)
  } catch (error) {
    console.log(error)
    return parseResponse(false, 500, '', 'Something went wrong')
  }
}
