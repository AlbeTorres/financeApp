import { getAccountsByUser } from '@/actions/financeApp/account/get-accounts-by-user'
import { getCategoriesByUser } from '@/actions/financeApp/category/get-categories-by-user'
import { getTransactionsByUser } from '@/actions/financeApp/transactions/get-transactions-by-user'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import OpenSheetButton from '../components/OpenSheetButton'
import { TransactionSheet } from '../components/TransactionSheet'
import { TransactionTable } from '../components/TransactionTable'
import { Account, Category, TransactionResponse } from '../interfaces'

export default async function TransactionPage() {
  const resultTransactions = await getTransactionsByUser()
  const resultCategories = await getCategoriesByUser()
  const resultAccounts = await getAccountsByUser()

  const result = resultTransactions.data as TransactionResponse[]
  const accounts = resultAccounts.data as Account[]
  const categories = resultCategories.data as Category[]

  const data = result.map(transaction => parseData(transaction))
  console.log(result)

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

const parseData = (data: TransactionResponse) => ({
  id: data.id,
  amount: data.amount,
  payee: data.payee,
  accountId: data.accountId,
  accountName: data.account.name,
  categoryId: data.categoryId,
  categoryName: data.category.name,
  notes: data.notes,
  date: new Date(data.date).toLocaleDateString(),
})
