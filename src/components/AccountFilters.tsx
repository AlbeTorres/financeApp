'use client'

import { useAccounts } from '@/hooks/api/account.hook'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export const AccountFilters = () => {
  const router = useRouter()
  const pathname = usePathname()

  const params = useSearchParams()
  const accountId = params.get('accountId') || 'all'
  const from = params.get('from') || ''
  const to = params.get('to') || ''

  const { data, isLoading: isLoadingAccounts } = useAccounts()
  const accounts = data?.data

  const onChange = (newValue: string) => {
    const query = { accountId: newValue, from, to }
    if (newValue === 'all') {
      query.accountId = ''
    }
    const url = qs.stringifyUrl({ url: pathname, query }, { skipEmptyString: true, skipNull: true })

    router.push(url)
  }

  return (
    <Select value={accountId} onValueChange={onChange} disabled={isLoadingAccounts}>
      <SelectTrigger className='lg:w-auto flex items-center justify-center w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 focus:bg-white/30 hover:text-white border-none focus:text-white focus:ring-offset-0 focus:ring-transparent outline-none text-white transition'>
        <SelectValue placeholder='Account' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>All accounts</SelectItem>
        {accounts?.map(account => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
