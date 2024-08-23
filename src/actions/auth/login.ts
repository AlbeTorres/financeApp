'use server'
import { signIn } from '@/auth'
import { sendVerificationMail } from '@/email/sendVerificationMail'
import prisma from '@/lib/prisma'
import { generateVerificationToken } from '@/lib/tokens'
import { LoginSchema } from '@/schema'
import bcryptjs from 'bcryptjs'
import * as z from 'zod'
import { parseResponse } from '../lib/parseResponse'

export const login = async ({ email, password }: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse({ email, password })

  if (!validatedFields.success) {
    return parseResponse(false, 401, 'invalid_fields', 'Invalid fields!')
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !user.email || !user.password) {
      return parseResponse(false, 401, 'invalid_credentials', 'Invalid credentials!')
    }

    if (!user.emailVerified) {
      const verificationToken = await generateVerificationToken(user.email)
      sendVerificationMail(user.email, verificationToken!.token, user!.name || '')
      return parseResponse(true, 200, 'unverificated_email', 'Confirmation email sent!')
    }

    if (!bcryptjs.compareSync(password, user.password!))
      return parseResponse(false, 401, 'credential_signin', 'Invalid credentials!')

    await signIn('credentials', { email, password, redirect: false })

    return parseResponse(true, 200, null, 'User autenticated')
  } catch (error) {
    return parseResponse(false, 500, '', 'Something went wrong')
  }
}

function isCredentialsSigninError(error: any): boolean {
  return (
    error &&
    typeof error === 'object' &&
    error.type === 'CredentialsSignin' &&
    error.kind === 'signIn' &&
    error.code === 'credentials'
  )
}
