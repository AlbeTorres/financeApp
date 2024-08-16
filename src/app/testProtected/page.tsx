import { auth } from '@/auth'

export default async function Test() {
  const user = await auth()
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Protected page</h1>
      {JSON.stringify(user)}
    </main>
  )
}
