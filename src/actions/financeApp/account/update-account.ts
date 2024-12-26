'use server'

import { Account } from '@/actions/lib/interfaces'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { updateAccountSchema } from '@/schema'
import { revalidatePath } from 'next/cache'
import * as z from 'zod'
import { parseResponse } from '../../lib/parseResponse'

export const updateAccount = async ({
  id,
  name,
  type,
  balance,
}: z.infer<typeof updateAccountSchema>) => {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    return parseResponse<Account>(false, 401, 'unauthorized_user', 'Unauthorized User')
  }

  const validatedFields = updateAccountSchema.safeParse({ name, id })

  if (!validatedFields.success) {
    return parseResponse<Account>(false, 400, 'invalid_fields', 'Invalid fields!')
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
        plaidId: true,
        userId: true,
      },
    })

    revalidatePath('/accounts')
    return parseResponse<Account>(true, 200, null, 'Account updated succesfully!', bank_account)
  } catch (error) {
    console.log(error)
    return parseResponse<Account>(false, 500, '', 'Something went wrong')
  }
}
