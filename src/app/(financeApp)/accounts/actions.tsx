'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Edit, MoreHorizontal } from 'lucide-react'
import { useAccountState } from '../store/AccountSheetSate'

type Props = {
  id: string
}

export const Actions = ({ id }: Props) => {
  const { onOpen } = useAccountState()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='size-8 p-0'>
          <MoreHorizontal className='size-4 mr-2' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
          <Edit className='size-4 mr-2' />
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
