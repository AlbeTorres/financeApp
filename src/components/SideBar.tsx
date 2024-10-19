import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { NavigationButton } from './NavigationButton'

type Route = {
  label: string
  href: string
  icon?: string
}

type Props = {
  path: string
  routes: Route[]
  isOpen: boolean
  onChange: Dispatch<SetStateAction<boolean>>
}

export const SideBar = ({ isOpen, onChange, routes, path }: Props) => {
  return (
    <Sheet open={isOpen} onOpenChange={onChange}>
      <SheetTrigger>
        <Button className='font-normal bg-white/10 hover:bg-white/20 text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none focus:bg-white/30 transition'>
          <Menu className='size-5' />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={'left'}
        className='px-2 bg-gradient-to-b from-blue-700 to-blue-500 border-none'
      >
        <nav className='flex flex-col gap-y-2 pt-6'>
          {routes.map(route => (
            <NavigationButton
              href={route.href}
              isActive={path === route.href}
              label={route.label}
              key={route.label}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
