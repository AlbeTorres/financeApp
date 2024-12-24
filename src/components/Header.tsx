import { Filters } from './Filters'
import { HeaderLogo } from './HeaderLogo'
import { Navigation } from './Navigation'
import { UserButton } from './UserButton'
import { WelcomeMsg } from './WelcomeMsg'

const Header = () => {
  return (
    <header className='bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-20'>
      <div className='max-w-screen-2xl mx-auto'>
        <div className='w-full flex items-center justify-between mb-10'>
          <div className='flex items-center lg:gap-x-16'>
            <HeaderLogo />
            <Navigation />
          </div>
          <div className='hidden lg:block'>
            <UserButton />
          </div>
        </div>
        <WelcomeMsg name='Alberto' />
        <Filters />
      </div>
    </header>
  )
}

export default Header
