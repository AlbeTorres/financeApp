'use client'
import { createCategory } from '@/actions/financeApp/category/create-category'
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
import { insertCategorySchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const formSchema = insertCategorySchema.pick({ name: true })

type FormValues = z.input<typeof formSchema>

type Props = {
  transactionId?: string
}

export const NewCategoryForm = ({ transactionId }: Props) => {
  const [loading, setLoading] = useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  })

  const handleSubmit = async (values: FormValues) => {
    const { name } = values

    setLoading(true)
    const result = await createCategory({ name })

    if (result.error !== null) {
      toast.error('Something went wrong!')
      setLoading(false)
    } else {
      if (transactionId) {
        const resultTransaction = await updateTransaction({
          id: transactionId,
          categoryId: result.data.id,
        })

        if (resultTransaction.error !== null) {
          toast.error('Something went wrong and we couldn`t update your transaction!')
          setLoading(false)
        }
      }

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
          Create category
        </Button>
      </form>
    </Form>
  )
}
