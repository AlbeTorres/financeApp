import { Account } from './Account'
import { Category } from './Category'

export interface Transaction {
  id: string
  amount: number
  payee: string
  accountId: string
  accountName: string
  categoryId: string | null
  categoryName: string | undefined
  notes: string | null
  date: string
}
export interface CSVTransaction {
  amount: number
  payee: string
  notes?: string
  date: Date
}

export interface TransactionResponse {
  id: string
  amount: bigint
  payee: string | null
  accountId: string
  categoryId: string | null
  notes: string | null
  date: Date
  category: Category | null
  account: Account
}
