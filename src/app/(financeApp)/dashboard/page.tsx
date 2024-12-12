import { getSummary } from '@/actions/financeApp/dashboard/summary'

export default async function DashBoardPage() {
  const summary = await getSummary()

  return (
    <div>
      <h1>{'dashboard'}</h1>
      <h1>{JSON.stringify(summary)}</h1>
    </div>
  )
}
