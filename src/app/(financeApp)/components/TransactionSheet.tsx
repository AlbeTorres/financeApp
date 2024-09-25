'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Account, Category, Transaction } from '../interfaces'

import { useTransactionState } from '../store/TransactionSheetState'
import { NewTransactionForm } from './NewTransactionForm'
import { UpdateTransactionForm } from './UpdateTransactionForm'

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
  const { isOpen, onClose, id } = useTransactionState()
  let transaction: Transaction | undefined
  if (id) {
    transaction = transactions.find(t => t.id === id)
  }

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
        {id ? (
          <UpdateTransactionForm
            accountOptions={ParseOptionsData(accounts)}
            categoryOptions={ParseOptionsData(categories)}
            onClose={onClose}
            id={id!}
            defaultValues={transaction}
          />
        ) : (
          <NewTransactionForm
            accountOptions={ParseOptionsData(accounts)}
            categoryOptions={ParseOptionsData(categories)}
          />
        )}
      </SheetContent>
    </Sheet>
  )
}

function ParseOptionsData(data: { id: string; name: string }[]) {
  const result = data.map(object => ({ label: object.name, value: object.id }))

  return result
}
