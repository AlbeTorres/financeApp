import prisma from '@/lib/prisma'

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const resetToken = await prisma.twoFactorToken.findFirst({ where: { email } })

    return resetToken
  } catch (error) {
    return null
  }
}
export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const resetToken = await prisma.twoFactorToken.findFirst({ where: { token } })

    return resetToken
  } catch (error) {
    return null
  }
}
