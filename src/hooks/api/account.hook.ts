import {
  createAccount,
  deleteAccount,
  fetchAccountById,
  fetchAccounts,
  updateAccount,
} from '@/lib/request/account.request'
import { FetchAccountByIdInput } from '@/lib/request/account.type'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useAccounts = (enabled = true) =>
  useQuery({ queryKey: ['accounts'], queryFn: fetchAccounts, enabled })

export const useAccountById = (input: FetchAccountByIdInput, enabled = true) =>
  useQuery({ queryKey: ['account', input.id], queryFn: () => fetchAccountById(input), enabled })

export const useCreateAccount = () =>
  useMutation({
    mutationFn: createAccount,
  })

export const useUpdateAccount = () =>
  useMutation({
    mutationFn: updateAccount,
  })

export const useDeleteAccount = () =>
  useMutation({
    mutationFn: deleteAccount,
  })
