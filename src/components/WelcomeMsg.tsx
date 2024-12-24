type Props = {
  name: string
}

export const WelcomeMsg = ({ name }: Props) => {
  return (
    <div className='space-y-2 mb-10'>
      <h2 className='text-2xl lg:text-4xl text-white font-medium'>Welcome back, {name}👋</h2>
      <p className='text-sm lg:text-base text-[#89b6fd]'>This is your Financial Overview Report</p>
    </div>
  )
}
