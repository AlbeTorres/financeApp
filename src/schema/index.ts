import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Password is required' }),
  code: z.optional(z.string()),
})
export const ResetSchema = z.object({
  email: z.string().email(),
})
export const ChangePasswordSchema = z.object({
  password: z.string().min(8, { message: 'Minimun 8 characters required' }),
})
export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Minimun 8 characters required' }),
  name: z.string().min(1, { message: 'Name is required' }),
})

export const insertAccountSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
})

export const updateAccountSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  id: z.string().uuid(),
})
