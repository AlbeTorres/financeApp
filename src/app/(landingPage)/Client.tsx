'use client'
import { changeLanguage } from '@/actions/user/settings'
import { Button } from '@/components/ui/button'

export const Client = () => {
  const changeL = async (locale: 'en' | 'es') => {
    await changeLanguage(locale)
  }

  return (
    <div>
      {' '}
      <Button onClick={() => changeL('en')}>ingles</Button>
      <Button onClick={() => changeL('es')}>español</Button>
    </div>
  )
}
