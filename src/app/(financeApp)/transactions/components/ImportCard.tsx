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

  const header = data[0]
  const body = data.slice(1)

  const onTableHeadSelectChange = (columnIndex: number, value: string | null) =>
    setSelectedColumns(prev => {
      const newSelectedColumns = { ...prev }
      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null
        }
      }

      if (value === 'skip') {
        value = null
      }

      newSelectedColumns[`column_${columnIndex}`] = value
      return newSelectedColumns
    })

  const progress = Object.values(selectedColumns).filter(column =>
    requiredOptions.includes(column!)
  ).length

  return (
    <>
      <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm'>
          <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
            <CardTitle className='text-xl line-clamp-1'>Import Transactions</CardTitle>
            <div className='flex items-center lg:flex-row flex-col gap-2'>
              <Button size={'sm'} className='w-full lg:w-auto' onClick={onCancel}>
                Cancel
              </Button>
              <Button
                size={'sm'}
                className='w-full lg:w-auto'
                disabled={progress < requiredOptions.length}
                onClick={() => {}}
              >
                Continue ({progress}/{requiredOptions.length})
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ImportTable
              headers={header}
              body={body}
              selectedColumns={selectedColumns}
              onTableHeadSelectChange={onTableHeadSelectChange}
            />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
