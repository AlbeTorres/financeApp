'use client'

import { Button } from '@/components/ui/button'
import { NewAccountState } from '../store/NewAccountSheetSate'

export default function DashBoardPage() {
  const { onOpen } = NewAccountState()
  return (
    <div>
      <h1>Dashboard page</h1>
      <Button onClick={onOpen}>Add an account</Button>
    </div>
  )
}
