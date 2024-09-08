import { createAccount } from '@/actions/financeApp/create-account'
import { updateAccount } from '@/actions/financeApp/update-account'
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
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const formSchema = insertAccountSchema.pick({ name: true })

type FormValues = z.input<typeof formSchema>

type Props = {
  id?: string
  defaultValues?: FormValues
  onSubmit: (values: FormValues) => void
  onDeleted?: () => void
  disabled?: boolean
}

export const AccountForm = ({ id, defaultValues, onSubmit, onDeleted, disabled }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || { name: '' },
  })

  const handleSubmit = async (values: FormValues) => {
    const { name } = values
    if (!!id) {
      const result = await updateAccount({ id, name })

      if (result.error !== null) {
        toast.error('Something went wrong!')
      } else {
        toast.success('Account updated successfully')
      }
    } else {
      const result = await createAccount({ name })

      if (result.error !== null) {
        toast.error('Something went wrong!')
      } else {
        toast.success('Account created successfully')
      }
    }
  }

  const handleDelete = () => {
    onDeleted?.()
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
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full' disabled={disabled}>
          {id ? 'Save changes' : 'Create account'}
        </Button>
        {!!id && (
          <Button
            type='button'
            variant={'outline'}
            onClick={handleDelete}
            className='w-full'
            disabled={disabled}
          >
            <Trash className='size-4 mr-2' />
            Delete account
          </Button>
        )}
      </form>
    </Form>
  )
}
