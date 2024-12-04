import { getAccountsByUser } from '@/actions/financeApp/account/get-accounts-by-user'
import { getCategoriesByUser } from '@/actions/financeApp/category/get-categories-by-user'
import { getTransactionsByUser } from '@/actions/financeApp/transactions/get-transactions-by-user'
import { Account, Category, TransactionResponse } from '@/interfaces'
import QueryProvider from '@/providers/ReactQueryProvider'
import { AccountSheet } from '../accounts/components'
import { CategorySheet } from '../categories/components'
import { TransactionSheet } from './components'
import { TransactionPageContent } from './components/TransactionPageContent'

export default async function TransactionPage() {
  const resultTransactions = await getTransactionsByUser()
  const resultCategories = await getCategoriesByUser()
  const resultAccounts = await getAccountsByUser()

  const result = resultTransactions.data as TransactionResponse[]
  const accounts = resultAccounts.data as Account[]
  const categories = resultCategories.data as Category[]

  const data = result.map(transaction => parseData(transaction))

  return (
    <>
      <AccountSheet />
      <CategorySheet />
      <TransactionSheet accounts={accounts} categories={categories} transactions={data} />
      <QueryProvider>
        <TransactionPageContent data={data} />
      </QueryProvider>
    </>
  )
}

const parseData = (data: TransactionResponse) => ({
  id: data.id,
  amount: data.amount,
  payee: data.payee,
  accountId: data.accountId,
  accountName: data.account.name,
  categoryId: data?.categoryId,
  categoryName: data.category?.name,
  notes: data.notes,
  date: data.date.toLocaleDateString(),
})
