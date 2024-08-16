'use server'

import { signIn } from '@/auth'
import { LoginSchema } from '@/schema'
import * as z from 'zod'

// export async function authenticate(prevState: string | undefined, formData: FormData) {
//   try {
//     await signIn('credentials', {
//       ...Object.fromEntries(formData),
//       redirect: false,
//     })

//     return 'Success'
//   } catch (error) {
//     console.log(error)
//     return 'CredentialsSignin'
//   }
// }

export const login = async ({ email, password }: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse({ email, password })

  if (!validatedFields.success) {
    return { ok: false, error: 'Invalid fields!' }
  }

  try {
    await signIn('credentials', { email, password, redirect: false })
    return { ok: true }
  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}
