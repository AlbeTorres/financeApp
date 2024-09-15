'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { parseResponse } from '../../lib/parseResponse'

export const deleteAccounts = async (deleteList: string[]) => {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    return parseResponse(false, 401, 'unauthorized_user', 'Unauthorized User')
  }

  try {
    const bank_account = await prisma.bank_Account.deleteMany({
      where: {
        id: {
          in: deleteList, // Filtra los IDs presentes en deleteList
        },
        userId: userId,
      },
    })

    revalidatePath('/accounts')

    return parseResponse(true, 200, null, 'Accounts deleted succesfully!', bank_account)
  } catch (error) {
    console.log(error)
    return parseResponse(false, 500, '', 'Something went wrong')
  }
}
