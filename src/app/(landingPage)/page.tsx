import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>FinanceApp Landing Page</h1>
      <div className='space-x-2'>
        <Button>
          <Link href={'/auth/login'}>Login</Link>
        </Button>
        <Button>
          <Link href={'/auth/new-account'}>Register</Link>
        </Button>
      </div>
    </main>
  )
}
