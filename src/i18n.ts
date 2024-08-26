import { getRequestConfig } from 'next-intl/server'
import { auth } from './auth'
import prisma from './lib/prisma'

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.

  const user = await auth()

  const id = user?.user.id

  let language = 'en'

  if (id) {
    const settings = await prisma.settings.findUnique({
      where: {
        userId: id,
      },
    })

    language = settings?.language || 'en'
  }

  const locale = language

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
