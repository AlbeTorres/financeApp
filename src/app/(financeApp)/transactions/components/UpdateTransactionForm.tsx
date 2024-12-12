'use client'
import { createAccount } from '@/actions/financeApp/account/create-account'
import { createCategory } from '@/actions/financeApp/category/create-category'
import { deleteTransactions } from '@/actions/financeApp/transactions/delete-transactions'
import { updateTransaction } from '@/actions/financeApp/transactions/update-transaction'
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
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { AmountInput } from '../../../../components/AmountInput'
import { DatePicker } from '../../../../components/DatePicker'

import { SelectComponent } from '@/components'
import { useConfirm } from '../../../../hooks/use-confirm'
import { Transaction } from '../../../../interfaces'

const formSchema = insertTransactionSchema

type FormValues = z.input<typeof formSchema>

type Props = {
  id: string
  accountOptions: { label: string; value: string }[]
  categoryOptions: { label: string; value: string }[]
  defaultValues: Transaction | undefined
  onClose(): void
}

//todo: añadir currencies al from y a la db
export const UpdateTransactionForm = ({
  accountOptions,
  categoryOptions,
  defaultValues,
  id,
  onClose,
}: Props) => {
  const [loading, setLoading] = useState(false)

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to perform a bulk delete.'
  )

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      amount: defaultValues?.amount.toString(),
      date: new Date(defaultValues!.date),
    },
  })

  const handleSubmit = async (values: FormValues) => {
    const { amount, date, payee, categoryId, accountId, notes } = values
    setLoading(true)
    const result = await updateTransaction({
      id,
      amount: Number(amount),
      accountId,
      categoryId,
      notes,
      date,
      payee,
    })
    if (result.error !== null) {
      toast.error('Something went wrong!')
      setLoading(false)
    } else {
      toast.success('Transaction updated successfully')
      form.reset()
      setLoading(false)
    }
    onClose()
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

  const handleDelete = async () => {
    const ok = await confirm()

    if (ok) {
      setLoading(true)
      const result = await deleteTransactions([id])
      form.reset()
      if (result.error) {
        toast.error('Something went wrong!')
      }
      onClose()

      setLoading(false)
    }
  }

  return (
    <>
      <ConfirmDialog />
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
          <Button className='w-full' disabled={loading || defaultValues === null}>
            Save changes
          </Button>

          <Button
            type='button'
            variant={'outline'}
            onClick={handleDelete}
            className='w-full'
            disabled={loading || defaultValues === null}
          >
            <Trash className='size-4 mr-2' />
            Delete category
          </Button>
        </form>
      </Form>
    </>
  )
}
