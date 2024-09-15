'use client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useAccountState } from '../store/AccountSheetSate copy'
import { useCategoryState } from '../store/CategorySheetSate'

type Props = {
  sheet: 'account' | 'category'
}

const OpenSheetButton = ({ sheet }: Props) => {
  const account = useAccountState()
  const category = useCategoryState()

  const openSheet = () => {
    switch (sheet) {
      case 'account':
        account.onOpen()
      case 'category':
        category.onOpen()
    }
  }

  return (
    <Button onClick={() => openSheet()} size='sm'>
      <Plus className='size-4 mr-2' />
      Add new
    </Button>
  )
}

export default OpenSheetButton
