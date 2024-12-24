'use client'

import QueryProvider from '@/providers/ReactQueryProvider'
import { AccountFilters } from './AccountFilters'
import DateFilters from './DateFilters'

export const Filters = () => {
  return (
    <QueryProvider>
      <div className='flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2 mb-10'>
        <AccountFilters />
        <DateFilters />
      </div>
    </QueryProvider>
  )
}
