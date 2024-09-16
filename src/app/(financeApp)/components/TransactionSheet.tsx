'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Transaction } from '../interfaces'

import { useTransactionState } from '../store/TransactionSheetState'

interface TransactionData {
  state: boolean
  error_code: 401 | 500 | 403 | 404 | 200 | 400
  error: any | null
  message: string | null
  data?: Transaction
}

export const TransactionSheet = () => {
  const [transactionData, setTransactionData] = useState<Transaction | null>(null)
  const { isOpen, onClose, id } = useTransactionState()

  useEffect(() => {
    const fetchAccountData = async () => {
      if (id) {
        const response = await fetch(`/api/account/${id}`)
        const { data } = (await response.json()) as TransactionData
        if (data) {
          setTransactionData(data)
        } else {
          toast.error('Something went wrong!')
        }
      }
    }

    fetchAccountData()
  }, [id])

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
      </SheetContent>
    </Sheet>
  )
}
