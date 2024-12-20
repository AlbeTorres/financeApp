import { getSummary } from '@/actions/financeApp/dashboard/summary'
import { DataCharts } from './components/DataCharts'
import { DataGrid } from './components/DataGrid'

export default async function DashBoardPage() {
  const summary = await getSummary()

  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
      <DataGrid data={summary.data!} />
      <DataCharts data={summary.data!} />
    </div>
  )
}
