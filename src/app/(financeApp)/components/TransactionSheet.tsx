'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useState } from 'react'
import { Account, Category, Transaction } from '../interfaces'

import { useTransactionState } from '../store/TransactionSheetState'
import { NewTransactionForm } from './NewTransactionForm'

interface TransactionData {
  state: boolean
  error_code: 401 | 500 | 403 | 404 | 200 | 400
  error: any | null
  message: string | null
  data?: Transaction
}

type Props = {
  accounts: Account[]
  categories: Category[]
  transactions: Transaction[]
}

export const TransactionSheet = ({ accounts, transactions, categories }: Props) => {
  const [transactionData, setTransactionData] = useState<Transaction | null>(null)
  const { isOpen, onClose, id } = useTransactionState()

  // useEffect(() => {
  //   const fetchAccountData = async () => {
  //     if (id) {
  //       const response = await fetch(`/api/account/${id}`)
  //       const { data } = (await response.json()) as TransactionData
  //       if (data) {
  //         setTransactionData(data)
  //       } else {
  //         toast.error('Something went wrong!')
  //       }
  //     }
  //   }

  //   fetchAccountData()
  // }, [id])

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>{!id ? 'New Transaction' : 'Edit Transaction'}</SheetTitle>
          <SheetDescription>
            {id
              ? 'Edit an existing transaction'
              : 'Create a new transaction to track your finances'}
          </SheetDescription>
        </SheetHeader>
        {/* {id ? (
          <UpdateAccountForm onClose={onClose} id={id!} defaultValues={accountData!} />
        ) : (
          <NewAccountForm />
        )} */}

        <NewTransactionForm
          accountOptions={ParseOptionsData(accounts)}
          categoryOptions={ParseOptionsData(categories)}
        />
      </SheetContent>
    </Sheet>
  )
}

function ParseOptionsData(data: { id: string; name: string }[]) {
  const result = data.map(object => ({ label: object.name, value: object.id }))

  return result
}
