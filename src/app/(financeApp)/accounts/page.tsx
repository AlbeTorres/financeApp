import { getAccountsByUser } from '@/actions/financeApp/get-accounts-by-user'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AccountButton from '../components/AccountButton'
import { AccountTable } from '../components/AccountTable'
import { Accounst } from '../interfaces'

export default async function DashBoardPage() {
  const result = await getAccountsByUser()

  const data = result.data as Accounst[]

  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='text-xl line-clamp-1'>Accounts page</CardTitle>
          <AccountButton />
        </CardHeader>
        <CardContent>
          <AccountTable data={data} />
        </CardContent>
      </Card>
    </div>
  )
}
