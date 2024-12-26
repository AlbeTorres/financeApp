import { Account } from '@/interfaces'
import { Function } from './types'

export type FetchAccounts = Function<FetchAccountsInput, FetchAccountsOutput>

export type FetchAccountsInput = void

export type FetchAccountsOutput = Account[] | null | undefined

export type FetchAccountById = Function<FetchAccountByIdInput, FetchAccountByIdOutput>

export type FetchAccountByIdInput = {
  id: string
}

export type FetchAccountByIdOutput = Account | null | undefined

export type DeleteAccountsById = Function<DeleteAccountsByIdInput, DeleteAccountsByIdOutput>

export type DeleteAccountsByIdInput = { ids: string[] }

export type DeleteAccountsByIdOutput =
  | { error: string } // En caso de error
  | { message: string } // En caso de éxito

export type CreateAccount = Function<CreateAccountInput, CreateAccountOutput>

export type CreateAccountInput = { name: string }

export type CreateAccountOutput = Account | null | undefined

export type UpdateAccount = Function<UpdateAccountInput, UpdateAccountOutput>

export type UpdateAccountInput = { id: string; name: string }

export type UpdateAccountOutput = Account | null | undefined
