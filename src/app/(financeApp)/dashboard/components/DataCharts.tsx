import { SummaryResponse } from '@/actions/financeApp/dashboard/summary'
import { Chart } from './Chart'

export const DataCharts = ({ data }: { data: SummaryResponse }) => {
  const isLoading = false

  if (isLoading) {
    ;<div>...Loading</div>
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
      <div className='col-span-1 lg:col-span-3 xl:col-span-4'>
        <Chart data={data.days} />
      </div>
    </div>
  )
}
