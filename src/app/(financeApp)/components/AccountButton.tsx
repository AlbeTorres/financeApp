'use client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { NewAccountState } from '../store/NewAccountSheetSate'

const AccountButton = () => {
  const { onOpen } = NewAccountState()

  return (
    <Button onClick={onOpen} size='sm'>
      <Plus className='size-4 mr-2' />
      Add new
    </Button>
  )
}

export default AccountButton
