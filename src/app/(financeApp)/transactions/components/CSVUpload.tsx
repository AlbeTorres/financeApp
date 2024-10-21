'use client'

import { useState } from 'react'

enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT',
}

const INITIAL_IMPORT_RESULT = {
  data: [],
  errors: [],
  meta: {},
}

const CSVUpload = () => {
  //sustituir este state por un store para cambiar la vista y activarlo con el uploadButton component
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <div>This is a screen for import</div>
      </>
    )
  }

  return <div>CSVUpload</div>
}

export default CSVUpload
