'use client'

import { Transaction } from '@/interfaces'
import { useCSVState } from '@/store'
import { useState } from 'react'
import { TransactionTable } from './TransactionTable'

enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT',
}

const INITIAL_IMPORT_RESULT = {
  data: [],
  errors: [],
  meta: {},
}

type Props = {
  data: Transaction[]
}

export const TransactionPageContent = ({ data }: Props) => {
  //sustituir este state por un store para cambiar la vista y activarlo con el uploadButton component
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
  const { isImporting } = useCSVState()

  if (isImporting === VARIANTS.IMPORT) {
    return (
      <>
        <div>This is a screen for import</div>
      </>
    )
  }

  return <TransactionTable data={data} />
}
