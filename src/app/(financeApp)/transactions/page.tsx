import { getTransactionsByUser } from '@/actions/financeApp/transactions/get-transactions-by-user'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import OpenSheetButton from '../components/OpenSheetButton'
import { TransactionSheet } from '../components/TransactionSheet'
import { TransactionTable } from '../components/TransactionTable'
import { Transaction } from '../interfaces'

export default async function TransactionPage() {
  const result = await getTransactionsByUser()

  const data = result.data as Transaction[]

  return (
    <>
      <TransactionSheet />
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
