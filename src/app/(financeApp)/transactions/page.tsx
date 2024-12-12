import { getAccountsByUser } from '@/actions/financeApp/account/get-accounts-by-user'
import { getCategoriesByUser } from '@/actions/financeApp/category/get-categories-by-user'
import { getTransactionsByUser } from '@/actions/financeApp/transactions/get-transactions-by-user'
import { Account, Category, Transaction } from '@/interfaces'
import QueryProvider from '@/providers/ReactQueryProvider'
import { AccountSheet } from '../accounts/components'
import { CategorySheet } from '../categories/components'
import { TransactionSheet } from './components'
import { TransactionPageContent } from './components/TransactionPageContent'

export default async function TransactionPage() {
  const resultTransactions = await getTransactionsByUser()
  const resultCategories = await getCategoriesByUser()
  const resultAccounts = await getAccountsByUser()

  const data = resultTransactions.data as Transaction[]
  const accounts = resultAccounts.data as Account[]
  const categories = resultCategories.data as Category[]

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
