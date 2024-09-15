'use client'

import { deleteCategories } from '@/actions/financeApp/category/delete-categories'
import { Row } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { columns } from '../categories/columns'
import { Account, Category } from '../interfaces'
import { DataTable } from './DataTable'

type Props = {
  data: Category[]
}

export const CategoryTable = ({ data }: Props) => {
  const onDelete = async (row: Row<Account>[]) => {
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
