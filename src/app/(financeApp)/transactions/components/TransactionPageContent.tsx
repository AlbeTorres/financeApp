'use client'

import { Card, CardContent, CardHeader, CardTitle, OpenSheetButton } from '@/components'
import { Transaction, VARIANTS } from '@/interfaces'
import { useCSVState } from '@/store'
import { useState } from 'react'
import { ImportCard } from './ImportCard'
import { TransactionTable } from './TransactionTable'
import { UploadButton } from './UploadButton'

type Props = {
  data: Transaction[]
}

export const TransactionPageContent = ({ data }: Props) => {
  //sustituir este state por un store para cambiar la vista y activarlo con el uploadButton component
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
  const { importResult, isImporting, setResults, onCancelImport } = useCSVState()

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
          <div className='flex items-center gap-2'>
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
