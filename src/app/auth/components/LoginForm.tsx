'use client'

import { login } from '@/actions/auth/login'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { CardWrapper } from './CardWrapper'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { AuthMessage } from './AuthMessage'

export const LoginForm = () => {
  const t = useTranslations('FinanceApp')
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ message: string; type: 'error' | 'success' | null }>({
    message: '',
    type: null,
  })
  const [showTwoFactor, setShowTwoFactor] = useState(false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const handleSubmit = async (values: z.infer<typeof LoginSchema>) =>
    startTransition(async () => {
      const result = await login(values)

      if (!result.state) {
        // Manejar error

        if (result.error === 'invalid_credentials' || 'credential_signin') {
          setMessage({
            message: 'Invalid credentials!',
            type: 'error',
          })
          return
        }

        setMessage({
          message: 'Something went wrong!',
          type: 'error',
        })
      } else {
        if (result.error === 'unverificated_email') {
          setMessage({
            message: 'Email sent',
            type: 'success',
          })
          return
        }
        if (result.error === 'two_factor_token_send') {
          setShowTwoFactor(true)
          return
        }

        // Redirigir al usuario
        router.push(callbackUrl)
      }
    })

  return (
    <CardWrapper
      headerLabel={t('login_title')}
      backButtonHref='/auth/new-account'
      backButtonLabel={t('register_link')}
      recoverButtonHref='/auth/reset'
      recoverButtonLabel={t('password_recover')}
      callbackUrl={callbackUrl}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {showTwoFactor ? (
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('two_factor_title')}</FormLabel>
                  <FormControl>
                    <Input
                      className='w-full px-4 py-2 border rounded-md  focus:outline-none focus:!ring-1 focus:!ring-blue-600'
                      {...field}
                      placeholder='123456'
                      type='code'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <div className='mt-4 space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('email')}</FormLabel>
                    <FormControl>
                      <Input
                        className='w-full px-4 py-2 border rounded-md  focus:outline-none focus:!ring-1 focus:!ring-blue-600'
                        {...field}
                        placeholder='jhon.doe@example.com'
                        type='email'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('password')}</FormLabel>
                    <FormControl>
                      <Input
                        className='w-full px-4 py-2 border rounded-md  focus:outline-none focus:!ring-1 focus:!ring-blue-600'
                        {...field}
                        placeholder='password'
                        type='password'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <AuthMessage className='my-4' type={message.type} message={message.message} />
          <Button
            disabled={isPending}
            type='submit'
            className='!block px-6 py-2 mt-8 w-full text-white bg-blue-600 rounded-lg hover:bg-blue-900 transition-all duration-300'
          >
            {showTwoFactor ? t('confirm') : t('login')}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
