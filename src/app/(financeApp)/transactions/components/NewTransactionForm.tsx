'use client'
import { createAccount } from '@/actions/financeApp/account/create-account'
import { createCategory } from '@/actions/financeApp/category/create-category'
import { createTransaction } from '@/actions/financeApp/transactions/create-transaction'
import { AmountInput, DatePicker, SelectComponent } from '@/components'
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
import { Textarea } from '@/components/ui/textarea'
import { insertTransactionSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const formSchema = insertTransactionSchema

type FormValues = z.input<typeof formSchema>

type Props = {
  accountOptions: { label: string; value: string }[]
  categoryOptions: { label: string; value: string }[]
}

//todo: añadir currencies al from y a la db
export const NewTransactionForm = ({ accountOptions, categoryOptions }: Props) => {
  const [loading, setLoading] = useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { amount: '', payee: '', date: undefined },
  })

  const handleSubmit = async (values: FormValues) => {
    const { amount, date, payee, categoryId, accountId, notes } = values
    setLoading(true)
    const result = await createTransaction(amount, accountId, categoryId, notes, date, payee)
    if (result.error !== null) {
      toast.error('Something went wrong!')
      setLoading(false)
    } else {
      toast.success('Transaction created successfully')
      form.reset()
      setLoading(false)
    }
  }

  const onCreateAccount = async (value: string) => {
    setLoading(true)
    const result = await createAccount({ name: value })

    if (result.error !== null) {
      toast.error('Something went wrong!')
      setLoading(false)
    } else {
      toast.success('Account created successfully')
      form.reset()
      setLoading(false)
    }
  }
  const onCreateCategory = async (value: string) => {
    setLoading(true)
    const result = await createCategory({ name: value })

    if (result.error !== null) {
      toast.error('Something went wrong!')
      setLoading(false)
    } else {
      toast.success('Category created successfully')
      form.reset()
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form className='space-y-4 pt-4' onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} disable={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='accountId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{'Account'}</FormLabel>
              <FormControl>
                <SelectComponent
                  placeholder='Select an account'
                  options={accountOptions}
                  onCreate={onCreateAccount}
                  value={field.value}
                  onChange={field.onChange}
                  disable={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='categoryId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{'Category'}</FormLabel>
              <FormControl>
                <SelectComponent
                  placeholder='Select a Category'
                  options={categoryOptions}
                  onCreate={onCreateCategory}
                  value={field.value}
                  onChange={field.onChange}
                  disable={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='payee'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{'Payee'}</FormLabel>
              <FormControl>
                <Input
                  className='w-full px-4 py-2 border rounded-md  focus:outline-none focus:!ring-1 focus:!ring-blue-600'
                  {...field}
                  placeholder='Add a payee'
                  type='text'
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{'Amount'}</FormLabel>
              <FormControl>
                <AmountInput {...field} disabled={loading} placeholder={'0.00'} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='notes'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{'Notes'}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='Optional notes'
                  value={field.value ?? ''}
                  className='w-full px-4 py-2 border rounded-md  focus:outline-none focus:!ring-1 focus:!ring-blue-600'
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full' disabled={loading}>
          Create transaction
        </Button>
      </form>
    </Form>
  )
}
