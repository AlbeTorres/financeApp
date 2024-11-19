import { createAccount } from '@/actions/financeApp/account/create-account'
import { SelectComponent } from '@/components'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import { Account, AccountsResponseData } from '@/interfaces'
import { Dialog, DialogTitle } from '@radix-ui/react-dialog'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

export const useSelectAccount = (): [() => JSX.Element, () => Promise<unknown>] => {
  const [accountData, setAccountData] = useState<Account[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [promise, setPromise] = useState<{ resolve: (value: string | undefined) => void } | null>(
    null
  )

  useEffect(() => {
    const fetchAccountData = async () => {
      setLoading(true)
      const response = await fetch(`/api/account/`)
      const { data } = (await response.json()) as AccountsResponseData
      if (data) {
        setAccountData(data)
      } else {
        toast.error('Something went wrong!')
      }
      setLoading(false)
    }

    fetchAccountData()
  }, [])

  const createNewAccount = async (name: string) => {
    setLoading(true)
    const result = await createAccount({ name })

    if (result.error !== null) {
      toast.error('Something went wrong!')
      setLoading(false)
    } else {
      toast.success('Account created successfully')
      setLoading(false)
    }
  }

  const selectValue = useRef<string>()

  const accountOptions = (accountData ?? []).map(account => ({
    label: account.name,
    value: account.id,
  }))

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
        <SelectComponent
          placeholder='Select an account'
          options={accountOptions}
          onCreate={createNewAccount}
          onChange={value => (selectValue.current = value)}
          disable={loading}
        />
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
