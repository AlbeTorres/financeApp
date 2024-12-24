'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useMedia } from 'react-use'
import { NavigationButton } from './NavigationButton'
import { SideBar } from './SideBar'

const routes = [
  {
    href: '/dashboard',
    label: 'dashboard',
    icon: '',
  },
  {
    href: '/accounts',
    label: 'accounts',
    icon: '',
  },
  {
    href: '/transactions',
    label: 'transactions',
    icon: '',
  },
  {
    href: '/categories',
    label: 'categories',
    icon: '',
  },
  {
    href: '/settings',
    label: 'settings',
    icon: '',
  },
]

export const Navigation = () => {
  const [isOpen, setOpen] = useState(false)
  const path = usePathname()
  const isMobile = useMedia('(max-width: 1024px)', false)

  if (isMobile) return <SideBar path={path} routes={routes} isOpen={isOpen} onChange={setOpen} />

  return (
    <nav className='hidden md:flex items-center gap-x-2 overflow-x-auto'>
      {routes.map(route => (
        <NavigationButton
          href={route.href}
          isActive={path === route.href}
          label={route.label}
          key={route.label}
        />
      ))}
    </nav>
  )
}
