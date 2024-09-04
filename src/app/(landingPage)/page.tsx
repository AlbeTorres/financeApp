import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Client } from './Client'

export default function Home() {
  const t = useTranslations('FinanceApp')

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>FinanceApp Landing Page</h1>
      <p>{t('title')}</p>
      <div className='space-x-2'>
        <Button>
          <Link href={'/auth/login'}>Login</Link>
        </Button>
        <Button>
          <Link href={'/auth/new-account'}>Register</Link>
        </Button>
        <Button>
          <Link href={'/dashboard'}>dashboard</Link>
        </Button>
      </div>
      <div className='space-x-2'>
        <p>Cambiar leguaje</p>
        <Client />
      </div>
    </main>
  )
}
