import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import Link from 'next/link'

type props = {
  href: string
  label: string
  isActive: boolean
  icon?: string
  className?: string
}

export const NavigationButton = ({ className, href, isActive, label, icon }: props) => {
  return (
    <Button
      asChild
      size={'sm'}
      variant={'outline'}
      className={clsx(
        className,
        'w-full md:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 bg-transparent focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition capitalize',
        { 'bg-white/10': isActive }
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  )
}
