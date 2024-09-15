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
import { Account } from '../interfaces'

import { useAccountState } from '../store/AccountSheetSate copy'
import { NewAccountForm } from './NewAccountForm'
import { UpdateAccountForm } from './UpdateAccountForm'

interface AccountData {
  state: boolean
  error_code: 401 | 500 | 403 | 404 | 200 | 400
  error: any | null
  message: string | null
  data?: Account
}

export const AccountSheet = () => {
  const [accountData, setAccountData] = useState<Account | null>(null)
  const { isOpen, onClose, id } = useAccountState()

  useEffect(() => {
    const fetchAccountData = async () => {
      if (id) {
        const response = await fetch(`/api/account/${id}`)
        const { data } = (await response.json()) as AccountData
        if (data) {
          setAccountData(data)
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
          <SheetTitle>{!id ? 'New Account' : 'Edit Account'}</SheetTitle>
          <SheetDescription>
            {id ? 'Edit an existing account' : 'Create a new account to track your transactions'}
          </SheetDescription>
        </SheetHeader>
        {id ? (
          <UpdateAccountForm onClose={onClose} id={id!} defaultValues={accountData!} />
        ) : (
          <NewAccountForm />
        )}
      </SheetContent>
    </Sheet>
  )
}
