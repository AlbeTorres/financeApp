'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { updateCategorySchema } from '@/schema'
import { revalidatePath } from 'next/cache'
import * as z from 'zod'
import { parseResponse } from '../../lib/parseResponse'

export const updateCategory = async ({ id, name }: z.infer<typeof updateCategorySchema>) => {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    return parseResponse(false, 401, 'unauthorized_user', 'Unauthorized User')
  }

  const validatedFields = updateCategorySchema.safeParse({ name, id })

  if (!validatedFields.success) {
    return parseResponse(false, 400, 'invalid_fields', 'Invalid fields!')
  }

  try {
    const category = await prisma.category.update({
      where: {
        id,
        userId: userId,
      },
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    })

    revalidatePath('/categories')
    return parseResponse(true, 200, null, 'Account updated succesfully!', category)
  } catch (error) {
    console.log(error)
    return parseResponse(false, 500, '', 'Something went wrong')
  }
}
