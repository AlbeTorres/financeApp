'use server'

import prisma from '@/lib/prisma'
import { generateVerificationToken } from '@/lib/tokens'
import { RegisterSchema } from '@/schema'
import bcryptjs from 'bcryptjs'
import * as z from 'zod'
import { parseResponse } from '../lib/parseResponse'

export const regsiterUser = async ({ name, email, password }: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse({ email, password, name })

  if (!validatedFields.success) {
    return parseResponse(false, 401, 'invalid_fields', 'Invalid fields!')
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLocaleLowerCase(),
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    const verificationToken = await generateVerificationToken(email)

    return parseResponse(true, 200, null, 'Confirmation email sent!', user)
  } catch (error) {
    console.log(error)
    return parseResponse(false, 200, error, 'Something went wrong')
  }
}
