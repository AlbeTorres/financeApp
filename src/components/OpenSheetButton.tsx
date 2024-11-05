'use client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useAccountState } from '../store/AccountSheetSate'
import { useCategoryState } from '../store/CategorySheetSate'
import { useTransactionState } from '../store/TransactionSheetState'

type Props = {
  sheet: 'account' | 'category' | 'transaction'
}

const OpenSheetButton = ({ sheet }: Props) => {
  const account = useAccountState()
  const category = useCategoryState()
  const transaction = useTransactionState()

  const openSheet = () => {
    switch (sheet) {
      case 'account':
        account.onOpen()
      case 'category':
        category.onOpen()
      case 'transaction':
        transaction.onOpen()
    }
  }

  return (
    <Button className='w-full lg:w-auto' onClick={() => openSheet()} size='sm'>
      <Plus className='size-4 mr-2' />
      Add new
    </Button>
  )
}

export default OpenSheetButton
