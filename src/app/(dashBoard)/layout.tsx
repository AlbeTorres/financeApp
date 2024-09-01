import { Header } from '@/components'

type Props = {
  children: React.ReactNode
}

export default async function DashBoardLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className='px-3 lg:px-14'>{children}</main>
    </>
  )
}
