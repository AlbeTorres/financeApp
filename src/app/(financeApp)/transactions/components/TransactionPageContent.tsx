'use client'

import { Card, CardContent, CardHeader, CardTitle, OpenSheetButton } from '@/components'
import { CSVTransaction, Transaction, VARIANTS } from '@/interfaces'
import { useCSVState } from '@/store'
import { ImportCard } from './ImportCard'
import { TransactionTable } from './TransactionTable'
import { UploadButton } from './UploadButton'

type Props = {
  data: Transaction[]
}

export const TransactionPageContent = ({ data }: Props) => {
  const { importResult, isImporting, setResults, onCancelImport } = useCSVState()

  const onSubmitImport = async (values: CSVTransaction[]) => {}

  const onCancelImportFunction = () => {
    setResults({ data: [], errors: [], meta: {} })
    onCancelImport()
  }

  if (isImporting === VARIANTS.IMPORT) {
    return (
      <>
        <ImportCard
          data={importResult.data}
          onCancel={onCancelImportFunction}
          onSubmit={() => {}}
        />
      </>
    )
  }

  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='text-xl line-clamp-1'>Transactions History</CardTitle>
          <div className='flex items-center lg:flex-row flex-col gap-2'>
            <OpenSheetButton sheet='transaction' />
            <UploadButton />
          </div>
        </CardHeader>
        <CardContent>
          <TransactionTable data={data} />
        </CardContent>
      </Card>
    </div>
  )
}
