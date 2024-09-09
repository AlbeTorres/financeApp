import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { parseResponse } from '../lib/parseResponse'

export const getAccountById = async (id: string) => {
  console.log(id)
  try {
    const session = await auth()
    const userId = session?.user.id

    if (!userId) {
      return parseResponse(false, 401, 'unauthorized_user', 'Unauthorized User')
    }

    const account = await prisma.bank_Account.findFirst({ where: { userId, id } })

    console.log(account)

    return parseResponse(true, 200, null, 'Account retrieved successfully!', account)
  } catch (error) {
    console.log(error)
    return parseResponse(false, 500, '', 'Something went wrong')
  }
}
