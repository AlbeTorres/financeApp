import { Header } from './components'
import { SheetProvider } from './providers/SheetProvider'

type Props = {
  children: React.ReactNode
}

export default async function DashBoardLayout({ children }: Props) {
  return (
    <>
      <SheetProvider />
      <Header />
      <main className='px-3 lg:px-14'>{children}</main>
    </>
  )
}
