import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import { Dialog, DialogTitle } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useAccounts, useCreateAccount } from './api/account.hook'

export const useSelectAccount = (): [() => JSX.Element, () => Promise<unknown>] => {
  const accountQuery = useAccounts()
  const queryClient = useQueryClient()
  const accountOptions = (accountQuery.data?.data ?? []).map(account => ({
    label: account.name,
    value: account.id,
  }))
  const [promise, setPromise] = useState<{ resolve: (value: string | undefined) => void } | null>(
    null
  )

  const accountMutation = useCreateAccount()

  const createNewAccount = (name: string) =>
    accountMutation.mutate(name, {
      onSuccess: () => {
        toast.success('Account created successfully')
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['accounts'] })
      },
      onError: () => toast.error('Something went wrong!'),
    })

  const selectValue = useRef<string>()

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve })
    })

  const handleClose = () => {
    setPromise(null)
  }
  const handleConfirm = () => {
    promise?.resolve(selectValue.current)
    handleClose()
  }
  const handleCancel = () => {
    promise?.resolve(undefined)
    handleClose()
  }

  const AccountDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>Please select an account to continue</DialogDescription>
        </DialogHeader>

        <Select
          onValueChange={value => (selectValue.current = value)}
          disabled={accountQuery.isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select an account' />
          </SelectTrigger>
          <SelectContent>
            {accountOptions.map(account => (
              <SelectItem key={account.value} value={account.value}>
                {account.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DialogFooter className='pt-2'>
          <Button onClick={handleCancel} variant={'outline'}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return [AccountDialog, confirm]
}
