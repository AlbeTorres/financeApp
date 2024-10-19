'use client'
import { deleteAccounts } from '@/actions/financeApp/account/delete-account'
import { Row } from '@tanstack/react-table'
import toast from 'react-hot-toast'

import { DataTable } from '@/components/DataTable'
import { Account } from '@/interfaces'
import { columns } from '../columns'

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
