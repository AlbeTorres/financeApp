import prisma from '@/lib/prisma'

export const getResetTokenByEmail = async (email: string) => {
  try {
    const resetToken = await prisma.passwordResetToken.findFirst({ where: { email } })

    return resetToken
  } catch (error) {
    return null
  }
}
export const getResetTokenByToken = async (token: string) => {
  try {
    const resetToken = await prisma.passwordResetToken.findFirst({ where: { token } })

    return resetToken
  } catch (error) {
    return null
  }
}
