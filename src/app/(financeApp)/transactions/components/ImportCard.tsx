import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components'
import { CSVTransaction, SelectedColumns } from '@/interfaces'
import { useState } from 'react'
import { ImportTable } from './ImportTable'

type Props = {
  data: string[][]
  onCancel: () => void
  onSubmit: (data: any) => void
}

// const format1 = 'yyyy-MM-dd HH:mm:ss'
// const format2 = 'yyyy-MM-dd'
// const format3 = 'dd/MM/yyyy'
// const format4 = 'dd-MM-yyyy'
// const format5 = 'MM/dd/yyyy'

// const formatDate = (date: string) => {
//   if (isValid(parse(date, format1, new Date()))) {
//     return format(parse(date, format1, new Date()), format2)
//   } else if (isValid(parse(date, format2, new Date()))) {
//     return format(parse(date, format2, new Date()), format2)
//   } else if (isValid(parse(date, format3, new Date()))) {
//     return format(parse(date, format3, new Date()), format2)
//   } else if (isValid(parse(date, format4, new Date()))) {
//     return format(parse(date, format4, new Date()), format2)
//   } else if (isValid(parse(date, format5, new Date()))) {
//     return format(parse(date, format5, new Date()), format2)
//   }

//   return 'invalid date format'
// }

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

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split('_')[1]
    }

    const mappedData = {
      headers: header.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`)
        return selectedColumns[`column_${columnIndex}`] || null
      }),
      body: body
        .map(row => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`)
            return selectedColumns[`column_${columnIndex}`] ? cell : null
          })

          return transformedRow.every(item => item === null) ? [] : transformedRow
        })
        .filter(row => row.length > 0),
    }

    const arrayOfData = mappedData.body
      .map(row => {
        const result = row.reduce((acc: any, cell, index) => {
          const header = mappedData.headers[index]

          if (header && cell) {
            acc[header] = cell
          }
          return acc
        }, {})

        // Solo devuelve el objeto si contiene alguna clave
        return Object.keys(result).length > 0 ? result : null
      })
      .filter(Boolean)

    const formattedData: CSVTransaction[] = arrayOfData.map(item => ({
      ...item,
      date: new Date(item.date),
      amount: Number(item.amount),
    }))

    onSubmit(formattedData)
  }

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
                onClick={handleContinue}
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
