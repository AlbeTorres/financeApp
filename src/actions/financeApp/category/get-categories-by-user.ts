import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { parseResponse } from '../../lib/parseResponse'

export const getCategoriesByUser = async (limit?: number, offset?: number) => {
  try {
    const session = await auth()
    const userId = session?.user.id

    if (!userId) {
      return parseResponse(false, 401, 'unauthorized_user', 'Unauthorized User')
    }

    //TODO: Cachear datos con redist
    const categories = await prisma.category.findMany({
      where: { userId },
      skip: offset,
      take: limit,
      orderBy: { name: 'desc' }, // Ordenar por nombre
    })

    return parseResponse(true, 200, null, 'Categories retrieved successfully!', categories)
  } catch (error) {
    console.log(error)
    return parseResponse(false, 500, '', 'Something went wrong')
  }
}
