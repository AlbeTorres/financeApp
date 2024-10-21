'use client'
import { Button } from '@/components'
import { Upload } from 'lucide-react'
import { useCSVReader } from 'react-papaparse'

type Props = {
  onUpload: (results: any) => void
}

export const UploadButton = () => {
  const { CSVReader } = useCSVReader()

  //TODO: add a paywall

  return (
    <CSVReader>
      {({ getRootProps }: any) => (
        <Button size='sm' className='w-full lg:w-auto' {...getRootProps()}>
          <Upload className='size-4 mr-2' />
          Import
        </Button>
      )}
    </CSVReader>
  )
}
