import prisma from './prisma'

export const getTwofactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    })

    return twoFactorConfirmation
  } catch (error) {}
}
