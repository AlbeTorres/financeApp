import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { DollarSign, PieChart, Shield, Star, TrendingUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { Client } from './Client'

export default function PersonalFinanceLanding() {
  const t = useTranslations('FinanceApp')
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='px-4 lg:px-6 h-14 flex items-center'>
        <Link className='flex items-center justify-center' href='#'>
          <DollarSign className='h-6 w-6 text-primary' />
          <span className='ml-2 text-2xl font-bold'>FinanceApp</span>
        </Link>
        <nav className='ml-auto flex gap-4 sm:gap-6'>
          <Link className='text-sm font-medium hover:underline underline-offset-4' href='#'>
            Features
          </Link>
          <Link className='text-sm font-medium hover:underline underline-offset-4' href='#'>
            Pricing
          </Link>
          <Link className='text-sm font-medium hover:underline underline-offset-4' href='#'>
            About
          </Link>
          <Link className='text-sm font-medium hover:underline underline-offset-4' href='#'>
            Contact
          </Link>
        </nav>
      </header>
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                  Take Control of Your Finances
                </h1>
                <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                  Simplify your financial life with our all-in-one personal finance app. Budget,
                  save, and invest smarter.
                </p>
              </div>
              <div className='mt-8 mb-10 relative w-full max-w-3xl aspect-[16/9] mx-auto'>
                <Image
                  src='/placeholder.svg?height=720&width=1280'
                  alt='Personal finance dashboard'
                  layout='fill'
                  objectFit='cover'
                  className='rounded-xl shadow-2xl'
                />
              </div>
              <div className='space-x-4'>
                <Button>Get Started</Button>
                <Button variant='outline'>Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
          <div className='container px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>
              Key Features
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              <Card>
                <CardContent className='flex flex-col items-center space-y-4 p-6'>
                  <Image
                    src='/placeholder.svg?height=200&width=200'
                    alt='Smart Budgeting'
                    width={200}
                    height={200}
                    className='rounded-full mb-4'
                  />
                  <PieChart className='h-12 w-12 text-primary' />
                  <h3 className='text-2xl font-bold text-center'>Smart Budgeting</h3>
                  <p className='text-center text-gray-500 dark:text-gray-400'>
                    Automatically categorize your expenses and create personalized budgets.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='flex flex-col items-center space-y-4 p-6'>
                  <Image
                    src='/placeholder.svg?height=200&width=200'
                    alt='Investment Tracking'
                    width={200}
                    height={200}
                    className='rounded-full mb-4'
                  />
                  <TrendingUp className='h-12 w-12 text-primary' />
                  <h3 className='text-2xl font-bold text-center'>Investment Tracking</h3>
                  <p className='text-center text-gray-500 dark:text-gray-400'>
                    Monitor your investments in real-time and get insights to grow your wealth.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='flex flex-col items-center space-y-4 p-6'>
                  <Image
                    src='/placeholder.svg?height=200&width=200'
                    alt='Secure Banking'
                    width={200}
                    height={200}
                    className='rounded-full mb-4'
                  />
                  <Shield className='h-12 w-12 text-primary' />
                  <h3 className='text-2xl font-bold text-center'>Secure Banking</h3>
                  <p className='text-center text-gray-500 dark:text-gray-400'>
                    Bank-level encryption keeps your financial data safe and secure.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>
              What Our Users Say
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {[1, 2, 3].map(i => (
                <Card key={i}>
                  <CardContent className='flex flex-col space-y-4 p-6'>
                    <div className='flex items-center space-x-4'>
                      <Image
                        src={`/placeholder.svg?height=60&width=60&text=User${i}`}
                        alt={`User ${i}`}
                        width={60}
                        height={60}
                        className='rounded-full'
                      />
                      <div>
                        <p className='font-semibold'>Happy User {i}</p>
                        <div className='flex items-center space-x-1'>
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star key={star} className='w-4 h-4 fill-primary' />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className='text-gray-500 dark:text-gray-400'>
                      {
                        "FinanceApp has completely transformed how I manage my money. It's intuitive, comprehensive, and actually makes personal finance enjoyable!"
                      }
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground relative'>
          <Image
            src='/placeholder.svg?height=1080&width=1920&text=Finance+Background'
            alt='Finance Background'
            layout='fill'
            objectFit='cover'
            className='absolute inset-0 mix-blend-overlay opacity-10'
          />
          <div className='container px-4 md:px-6 relative z-10'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Ready to Take Control?
                </h2>
                <p className='mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl'>
                  Join thousands of users who have already transformed their financial lives with
                  FinanceApp.
                </p>
              </div>
              <div className='w-full max-w-sm space-y-2'>
                <form className='flex space-x-2'>
                  <Input
                    className='max-w-lg flex-1 bg-primary-foreground text-primary'
                    placeholder='Enter your email'
                    type='email'
                  />
                  <Button
                    className='bg-primary-foreground text-primary hover:bg-primary-foreground/90'
                    type='submit'
                  >
                    Get Started
                  </Button>
                </form>
                <p className='text-xs text-primary-foreground/90'>
                  By signing up, you agree to our{' '}
                  <Link className='underline underline-offset-2' href='#'>
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          © 2024 FinanceApp. All rights reserved.
        </p>
        <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
          <Link className='text-xs hover:underline underline-offset-4' href='#'>
            Terms of Service
          </Link>
          <Link className='text-xs hover:underline underline-offset-4' href='#'>
            Privacy
          </Link>
        </nav>
      </footer>

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
    </div>
  )
}
