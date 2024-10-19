'use client'

import { Button } from '@/components/ui/button'
import { useAccountState } from '../../../store'

export default function DashBoardPage() {
  const { onOpen } = useAccountState()
  return (
    <div>
      <h1>Dashboard page</h1>
      <Button onClick={() => onOpen()}>Add an account</Button>
    </div>
  )
}
