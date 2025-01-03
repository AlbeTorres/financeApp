'use client'
import { createAccount } from '@/actions/financeApp/account/create-account'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { insertAccountSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const formSchema = insertAccountSchema.pick({ name: true })

type FormValues = z.input<typeof formSchema>

export const NewAccountForm = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  })

  const handleSubmit = async (values: FormValues) => {
    const { name } = values

    setLoading(true)
    const result = await createAccount({ name })

    if (result.error !== null) {
      toast.error('Something went wrong!')
      setLoading(false)
    } else {
      toast.success('Account created successfully')
      form.reset()
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form className='space-y-4 pt-4' onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{'Name'}</FormLabel>
              <FormControl>
                <Input
                  className='w-full px-4 py-2 border rounded-md  focus:outline-none focus:!ring-1 focus:!ring-blue-600'
                  {...field}
                  placeholder='e.g. Cash, Bank, Credit Card'
                  type='text'
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full' disabled={loading}>
          Create account
        </Button>
      </form>
    </Form>
  )
}
