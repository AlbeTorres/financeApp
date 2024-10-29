import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components'
import { SelectedColumns } from '@/interfaces'
import { useState } from 'react'
import { ImportTable } from './ImportTable'

type Props = {
  data: string[][]
  onCancel: () => void
  onSubmit: (data: any) => void
}

const dateFormat = 'yyyy-MM-dd HH:mm:ss'
const outputFormat = 'yyyy-MM-dd'

const requiredOptions = ['amount', 'date', 'payee']

export const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumns>({})
  console.log(data)

  const header = data[0]
  const body = data.slice(1)
  return (
    <>
      <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm'>
          <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
            <CardTitle className='text-xl line-clamp-1'>Import Transactions</CardTitle>
            <div className='flex items-center gap-2'>
              <Button onClick={onCancel}>Cancel</Button>
            </div>
          </CardHeader>
          <CardContent>
            <ImportTable
              headers={header}
              body={body}
              selectedColumns={selectedColumns}
              onTableHeadSelectChange={() => {}}
            />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
