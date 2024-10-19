'use client'

import { deleteCategories } from '@/actions/financeApp/category/delete-categories'
import { DataTable } from '@/components'
import { Category } from '@/interfaces'
import { Row } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { columns } from '../columns'

type Props = {
  data: Category[]
}

export const CategoryTable = ({ data }: Props) => {
  const onDelete = async (row: Row<Category>[]) => {
    const ids = row.map(r => r.original.id)
    const result = await deleteCategories(ids)

    if (result.error) {
      toast.error('Something went wrong!')
    }
  }
  return (
    <DataTable columns={columns} data={data} filterKey='name' onDelete={row => onDelete(row)} />
  )
}
