import { getSummary } from '@/actions/financeApp/dashboard/summary'

export default async function DashBoardPage() {
  const summary = await getSummary()
  console.log(summary)
  return (
    <div>
      <h1>{'dashboard'}</h1>
    </div>
  )
}
