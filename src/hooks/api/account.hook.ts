import { createAccount, fetchAccounts } from '@/lib/request/account.request'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useAccounts = () => useQuery({ queryKey: ['accounts'], queryFn: fetchAccounts })

export const useCreateAccount = () =>
  useMutation({
    mutationFn: createAccount,
  })
