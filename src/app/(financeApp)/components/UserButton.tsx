import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Image from 'next/image'

export const UserButton = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className='border-2 rounded-full h-11 w-11'>
          <Image
            src={'/user.png'}
            alt='user'
            width={50}
            height={50}
            className='rounded-full object-cover w-full h-full'
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-56'>
        <div className='space-y-5'>
          <Button
            size={'sm'}
            variant={'outline'}
            className={
              'w-full block font-normal hover:bg-blue-700/70 hover:text-white border-none focus-visible:ring-offset-0 bg-transparent focus-visible:ring-transparent outline-none transition capitalize'
            }
          >
            Profile
          </Button>
          <Button
            size={'sm'}
            variant={'outline'}
            className={
              'w-full block font-normal hover:bg-blue-700/70 hover:text-white border-none focus-visible:ring-offset-0 bg-transparent focus-visible:ring-transparent outline-none  transition capitalize'
            }
          >
            Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
