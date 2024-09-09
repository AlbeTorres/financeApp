'use client'

import { deleteAccounts } from '@/actions/financeApp/delete-account'
import { Row } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { columns } from '../accounts/columns'
import { Account } from '../interfaces'
import { DataTable } from './DataTable'

type Props = {
  data: Account[]
}

export const AccountTable = ({ data }: Props) => {
  const onDelete = async (row: Row<Account>[]) => {
    const ids = row.map(r => r.original.id)
    const result = await deleteAccounts(ids)

    if (result.error) {
      toast.error('Something went wrong!')
    }
  }
  return (
    <DataTable columns={columns} data={data} filterKey='name' onDelete={row => onDelete(row)} />
  )
}
