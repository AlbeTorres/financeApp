'use client'
import { Button } from '@/components'
import { useCSVState } from '@/store'
import { Upload } from 'lucide-react'
import { useCSVReader } from 'react-papaparse'

type Props = {
  onUpload: (results: any) => void
}

export const UploadButton = () => {
  const { CSVReader } = useCSVReader()
  const { onImport } = useCSVState()

  //TODO: add a paywall

  const onUpload = () => {
    onImport()
  }

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button size='sm' className='w-full lg:w-auto' {...getRootProps()}>
          <Upload className='size-4 mr-2' />
          Import
        </Button>
      )}
    </CSVReader>
  )
}
