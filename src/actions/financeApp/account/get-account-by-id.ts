import { Account } from '@/actions/lib/interfaces'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { parseResponse } from '../../lib/parseResponse'

export const getAccountById = async (id: string) => {
  try {
    const session = await auth()
    const userId = session?.user.id

    if (!userId) {
      return parseResponse<Account>(false, 401, 'unauthorized_user', 'Unauthorized User')
    }

    const account = await prisma.bank_Account.findFirst({ where: { userId, id } })

    return parseResponse<Account | null>(
      true,
      200,
      null,
      'Account retrieved successfully!',
      account
    )
  } catch (error) {
    console.log(error)
    return parseResponse<Account>(false, 500, '', 'Something went wrong')
  }
}
