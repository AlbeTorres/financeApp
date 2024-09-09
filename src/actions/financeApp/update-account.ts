'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { updateAccountSchema } from '@/schema'
import { revalidatePath } from 'next/cache'
import * as z from 'zod'
import { parseResponse } from '../lib/parseResponse'

export const updateAccount = async ({ id, name }: z.infer<typeof updateAccountSchema>) => {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    return parseResponse(false, 401, 'unauthorized_user', 'Unauthorized User')
  }

  const validatedFields = updateAccountSchema.safeParse({ name, id })

  if (!validatedFields.success) {
    return parseResponse(false, 400, 'invalid_fields', 'Invalid fields!')
  }

  try {
    const bank_account = await prisma.bank_Account.update({
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

    revalidatePath('/account')
    return parseResponse(true, 200, null, 'Account updated succesfully!', bank_account)
  } catch (error) {
    console.log(error)
    return parseResponse(false, 500, '', 'Something went wrong')
  }
}
