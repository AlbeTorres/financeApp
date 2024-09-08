import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { parseResponse } from '../lib/parseResponse'

export const getAccountsByUser = async () => {
  try {
    const session = await auth()
    const userId = session?.user.id

    if (!userId) {
      return parseResponse(false, 401, 'unauthorized_user', 'Unauthorized User')
    }

    const accounts = await prisma.bank_Account.findMany({ where: { userId } })

    return parseResponse(true, 200, null, 'Accounts retrieved successfully!', accounts)
  } catch (error) {
    console.log(error)
    return parseResponse(false, 500, '', 'Something went wrong')
  }
}
