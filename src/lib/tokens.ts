import cryto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import prisma from './prisma'
import { getResetTokenByEmail } from './reset-token'
import { getTwoFactorTokenByEmail } from './two-factor-token'
import { getVerificationTokenByEmail } from './verification-token'

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // one hour from now

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await prisma.verificationToken.delete({ where: { id: existingToken.id } })
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return verificationToken
}

export const generateResetToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // one hour from now

  const existingToken = await getResetTokenByEmail(email)

  if (existingToken) {
    await prisma.passwordResetToken.delete({ where: { id: existingToken.id } })
  }

  const resetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return resetToken
}

export const generateTwoFactorToken = async (email: string) => {
  const token = cryto.randomInt(100_000, 1_000_000).toString()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // one hour from now

  const existingToken = await getTwoFactorTokenByEmail(email)

  if (existingToken) {
    await prisma.twoFactorToken.delete({ where: { id: existingToken.id } })
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return twoFactorToken
}
