import { getAccountsByUser } from '@/actions/financeApp/account/get-accounts-by-user'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AccountSheet } from '../components/AccountSheet'
import { AccountTable } from '../components/AccountTable'
import OpenSheetButton from '../components/OpenSheetButton'
import { Account } from '../interfaces'

export default async function AccountPage() {
  const result = await getAccountsByUser()

  const data = result.data as Account[]

  return (
    <>
      <AccountSheet />
      <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm'>
          <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
            <CardTitle className='text-xl line-clamp-1'>Accounts page</CardTitle>
            <OpenSheetButton sheet='account' />
          </CardHeader>
          <CardContent>
            <AccountTable data={data} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
