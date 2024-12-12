import { TransactionResponse } from '@/interfaces'
import { convertAmountFromMiliunits } from '@/lib/utils'

export function parseTransactions(transactionsToParse: TransactionResponse[]) {
  const transactions = transactionsToParse.map(transaction => ({
    id: transaction.id,
    amount: convertAmountFromMiliunits(Number(transaction.amount)),
    payee: transaction.payee ? transaction.payee : '',
    accountId: transaction.accountId,
    accountName: transaction.account.name,
    categoryId: transaction?.categoryId,
    categoryName: transaction.category?.name,
    notes: transaction.notes,
    date: transaction.date.toLocaleDateString(),
  }))

  return transactions
}

export function parseTransaction(data: TransactionResponse) {
  return {
    id: data.id,
    amount: convertAmountFromMiliunits(Number(data.amount)),
    payee: data.payee ? data.payee : '',
    accountId: data.accountId,
    accountName: data.account.name,
    categoryId: data?.categoryId,
    categoryName: data.category?.name,
    notes: data.notes,
    date: data.date.toLocaleDateString(),
  }
}
