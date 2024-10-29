'use client'

import { VARIANTS } from '@/interfaces'
import { useState } from 'react'

const CSVUpload = () => {
  //sustituir este state por un store para cambiar la vista y activarlo con el uploadButton component
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)

  return <div>CSVUpload</div>
}

export default CSVUpload
