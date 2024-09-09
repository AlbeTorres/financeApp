'use client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useAccountState } from '../store/AccountSheetSate'

const AccountButton = () => {
  const { onOpen } = useAccountState()

  return (
    <Button onClick={() => onOpen()} size='sm'>
      <Plus className='size-4 mr-2' />
      Add new
    </Button>
  )
}

export default AccountButton
