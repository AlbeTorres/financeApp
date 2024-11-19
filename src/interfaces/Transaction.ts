import { Account } from './Account'
import { Category } from './Category'

export interface Transaction {
  id: string
  amount: string
  payee?: string
  accountId: string
  accountName: string
  categoryId?: string
  categoryName?: string
  notes: string
  date: string
}
export interface CSVTransaction {
  amount: string
  payee?: string
  notes?: string
  date: string
}

export interface TransactionResponse {
  id: string
  amount: string
  payee?: string
  accountId: string
  accountName: string
  categoryId: string
  categoryName: string
  notes: string
  date: Date
  category: Category
  account: Account
}
