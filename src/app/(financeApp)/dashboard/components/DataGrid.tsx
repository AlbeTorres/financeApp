'use client'

import { SummaryResponse } from '@/actions/financeApp/dashboard/summary'
import { formatDateRange } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { FaPiggyBank } from 'react-icons/fa'
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6'
import { DataCard } from './DataCard'
import { DataCardLoading } from './DataCardLoading'

export const DataGrid = ({ data }: { data: SummaryResponse }) => {
  const params = useSearchParams()
  const to = params.get('to') || undefined
  const from = params.get('from') || undefined

  const dateRangeLabel = formatDateRange({ to, from })

  const isloading = false

  if (isloading) {
    return (
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8'>
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8'>
      <DataCard
        title='Remaining'
        value={data.remainingAmount}
        percentageChange={data.remainingChange}
        icon={FaPiggyBank}
        dateRange={dateRangeLabel}
      />
      <DataCard
        title='Income'
        variant={'success'}
        value={data.incomeAmount}
        percentageChange={data.incomeChange}
        icon={FaArrowTrendUp}
        dateRange={dateRangeLabel}
      />
      <DataCard
        title='Expenses'
        value={data.expensesAmount}
        variant={'danger'}
        percentageChange={data.expensesChange}
        icon={FaArrowTrendDown}
        dateRange={dateRangeLabel}
      />
    </div>
  )
}
