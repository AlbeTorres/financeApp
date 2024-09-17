import { getAccountsByUser } from '@/actions/financeApp/account/get-accounts-by-user'
import { getCategoriesByUser } from '@/actions/financeApp/category/get-categories-by-user'
import { getTransactionsByUser } from '@/actions/financeApp/transactions/get-transactions-by-user'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import OpenSheetButton from '../components/OpenSheetButton'
import { TransactionSheet } from '../components/TransactionSheet'
import { TransactionTable } from '../components/TransactionTable'
import { Account, Category, Transaction } from '../interfaces'

export default async function TransactionPage() {
  const resultTransactions = await getTransactionsByUser()
  const resultCategories = await getCategoriesByUser()
  const resultAccounts = await getAccountsByUser()

  const data = resultTransactions.data as Transaction[]
  const accounts = resultAccounts.data as Account[]
  const categories = resultCategories.data as Category[]

  return (
    <>
      <TransactionSheet accounts={accounts} categories={categories} transactions={data} />
      <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm'>
          <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
            <CardTitle className='text-xl line-clamp-1'>Transactions page</CardTitle>
            <OpenSheetButton sheet='transaction' />
          </CardHeader>
          <CardContent>
            <TransactionTable data={data} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
