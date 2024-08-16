'use server'

import prisma from '@/lib/prisma'
import { RegisterSchema } from '@/schema'
import bcryptjs from 'bcryptjs'
import * as z from 'zod'

export const regsiterUser = async ({ name, email, password }: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse({ email, password })

  if (!validatedFields.success) {
    return { ok: false, error: 'Invalid fields!' }
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

    return {
      ok: true,
      user: user,
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
    }
  }
}
