'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { parseResponse } from '../lib/parseResponse'

export const getSettingsByUserId = async (userId: string) => {
  try {
    const settings = await prisma.settings.findUnique({
      where: {
        userId,
      },
    })

    return settings
  } catch (error) {
    console.log(error)
  }
}

export const changeLanguage = async (language: 'en' | 'es') => {
  try {
    const session = await auth()
    if (!session?.user) {
      return parseResponse(false, 401, 'unautorized_user', null, 'User must be authenticated')
    }
    const userId = session?.user.id
    if (userId) {
      await prisma.settings.update({
        where: {
          userId: userId,
        },
        data: {
          language,
        },
      })

      revalidatePath('/')

      return parseResponse(true, 200, null, null, 'Language changed successfully')
    }

    return parseResponse(false, 400, 'nextauth_session_error', 'User has not id')
  } catch (error) {
    console.log(error)
    return parseResponse(false, 500, '', 'Something went wrong')
  }
}
