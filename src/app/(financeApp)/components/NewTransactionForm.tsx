import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { insertTransactionSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Select } from './Select'

const formSchema = insertTransactionSchema

type FormValues = z.input<typeof formSchema>

type Props = {
  accountOptions: { label: string; value: string }[]
  categoryOptions: { label: string; value: string }[]
  onCreateAccount: (value: string) => void
  onCreateCategory: (value: string) => void
}

export const NewTransactionForm = ({
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}: Props) => {
  const [loading, setLoading] = useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { amount: '', payee: '', date: new Date() },
  })

  const handleSubmit = async (values: FormValues) => {
    // const { amount } = values
    // setLoading(true)
    // const result = await createTransaction()
    // if (result.error !== null) {
    //   toast.error('Something went wrong!')
    //   setLoading(false)
    // } else {
    //   toast.success('Account created successfully')
    //   form.reset()
    //   setLoading(false)
    // }
  }

  return (
    <Form {...form}>
      <form className='space-y-4 pt-4' onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name='accountId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{'Account'}</FormLabel>
              <FormControl>
                <Select
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
        <Button className='w-full' disabled={loading}>
          Create account
        </Button>
      </form>
    </Form>
  )
}
