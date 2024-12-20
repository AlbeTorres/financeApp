'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components'
import { AreaChart, BarChart, FileSearch, LineChart } from 'lucide-react'
import { useState } from 'react'
import { AreaVariant } from './chartVariants/AreaVariant'
import { BarVariant } from './chartVariants/BarVariant'
import { LineVariant } from './chartVariants/LineVariant'

type Props = {
  data?: {
    date: Date
    income: number
    expenses: number
  }[]
}

export const Chart = ({ data = [] }: Props) => {
  const [chartType, setChartType] = useState('bar')

  const onTypeChange = (type: string) => {
    //Add paywall
    setChartType(type)
  }
  return (
    <Card className='border-none drop-shadow-sm'>
      <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
        <CardTitle className='text-xl line-clamp-1'>Transactions</CardTitle>
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className='lg:w-auto h-9 rounded-md px-3'>
            <SelectValue placeholder='Chart type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='area'>
              <div className='flex items-center'>
                <AreaChart className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>AreaChart</p>
              </div>
            </SelectItem>
            <SelectItem value='line'>
              <div className='flex items-center'>
                <LineChart className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>LineChart</p>
              </div>
            </SelectItem>
            <SelectItem value='bar'>
              <div className='flex items-center'>
                <BarChart className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>BarChart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className='flex flex-col gap-y-4 items-center justify-center h-[350px] w-full'>
            <FileSearch className='size-6 text-muted-foreground' />
            <p className='text-muted-foreground text-sm'>No data for this period</p>
          </div>
        ) : (
          <>
            {chartType === 'area' && <AreaVariant data={data} />}
            {chartType === 'line' && <LineVariant data={data} />}
            {chartType === 'bar' && <BarVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  )
}
