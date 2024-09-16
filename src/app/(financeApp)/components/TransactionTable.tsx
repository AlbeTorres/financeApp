'use client'

import { deleteTransactions } from '@/actions/financeApp/transactions/delete-transactions'
import { Row } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { Transaction } from '../interfaces'
import { columns } from '../transactions/columns'
import { DataTable } from './DataTable'

type Props = {
  data: Transaction[]
}

export const TransactionTable = ({ data }: Props) => {
  const onDelete = async (row: Row<Transaction>[]) => {
    const ids = row.map(r => r.original.id)
    const result = await deleteTransactions(ids)

    if (result.error) {
      toast.error('Something went wrong!')
    }
  }
  return (
    <DataTable columns={columns} data={data} filterKey='name' onDelete={row => onDelete(row)} />
  )
}
