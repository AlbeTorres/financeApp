'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Dispatch, SetStateAction } from 'react'
import { useMountedState } from 'react-use'
import { NewAccountState } from '../store/NewAccountSheetSate'
import { AccountForm } from './AccountForm'

type Props = {
  isOpen: boolean
  onChange: Dispatch<SetStateAction<boolean>>
}

export const AccountSheet = () => {
  const isMounted = useMountedState()

  if (!isMounted) return null

  const { isOpen, onClose } = NewAccountState()
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Create a new account to track your transactions</SheetDescription>
        </SheetHeader>
        <AccountForm onSubmit={() => {}} />
      </SheetContent>
    </Sheet>
  )
}
