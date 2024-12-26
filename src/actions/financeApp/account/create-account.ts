'use server'

import { Account } from '@/actions/lib/interfaces'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { insertAccountSchema } from '@/schema'
import { revalidatePath } from 'next/cache'
import * as z from 'zod'
import { parseResponse } from '../../lib/parseResponse'

export const createAccount = async ({ name }: z.infer<typeof insertAccountSchema>) => {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    return parseResponse<Account>(false, 401, 'unauthorized_user', 'Unauthorized User')
  }

  const validatedFields = insertAccountSchema.safeParse({ name })

  if (!validatedFields.success) {
    return parseResponse<Account>(false, 400, 'invalid_fields', 'Invalid fields!')
  }

  try {
    const bank_account = await prisma.bank_Account.create({
      data: {
        name,
        userId,
      },
      select: {
        id: true,
        name: true,
        plaidId: true,
        userId: true,
      },
    })
    revalidatePath('/accounts')

    return parseResponse<Account | null>(
      true,
      200,
      null,
      'Account created successfully!',
      bank_account
    )
  } catch (error) {
    console.log(error)
    return parseResponse<Account>(false, 500, '', 'Something went wrong')
  }
}
