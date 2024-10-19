'use client'
import { deleteCategories } from '@/actions/financeApp/category/delete-categories'
import { updateCategory } from '@/actions/financeApp/category/update-category'
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
import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useConfirm } from '../../../../hooks/use-confirm'

const formSchema = insertCategorySchema.pick({ name: true })

type FormValues = z.input<typeof formSchema>

type Props = {
  id: string
  defaultValues?: FormValues
  disabled?: boolean
  onClose(): void
}

export const UpdateCategoryForm = ({ id, defaultValues, onClose }: Props) => {
  const [loading, setLoading] = useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  })
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to perform a bulk delete.'
  )

  useEffect(() => {
    if (defaultValues?.name !== undefined) form.setValue('name', defaultValues.name)
  }, [defaultValues]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (values: FormValues) => {
    setLoading(true)
    const { name } = values

    const result = await updateCategory({ id, name })

    if (result.error !== null) {
      toast.error('Something went wrong!')
    } else {
      toast.success('Category updated successfully')
      form.reset()
    }
    onClose()
  }

  const handleDelete = async () => {
    const ok = await confirm()

    if (ok) {
      setLoading(true)
      const result = await deleteCategories([id])
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
                    disabled={loading || defaultValues === null}
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
