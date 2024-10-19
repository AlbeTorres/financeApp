import { getCategoriesByUser } from '@/actions/financeApp/category/get-categories-by-user'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { OpenSheetButton } from '@/components'

import { Category } from '@/interfaces'
import { CategorySheet, CategoryTable } from './components'

export default async function CategoriesPage() {
  const result = await getCategoriesByUser()

  const data = result.data as Category[]

  return (
    <>
      <CategorySheet />
      <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm'>
          <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
            <CardTitle className='text-xl line-clamp-1'>Categories page</CardTitle>
            <OpenSheetButton sheet='category' />
          </CardHeader>
          <CardContent>
            <CategoryTable data={data} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
