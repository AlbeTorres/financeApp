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
import { FileSearch, PieChart, Radar, Target } from 'lucide-react'
import { useState } from 'react'
import { PieVariant } from './pieVariants/PieVariant'
import { RadarVariant } from './pieVariants/RadarVariant'
import { RadialVariant } from './pieVariants/RadialVariant'

type Props = {
  data?: {
    name: string
    value: number
    percent: number
  }[]
}

export const SpendingPie = ({ data = [] }: Props) => {
  const [pieType, setPieType] = useState('pie')

  const onTypeChange = (type: string) => {
    //Add paywall
    setPieType(type)
  }
  return (
    <Card className='border-none drop-shadow-sm'>
      <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
        <CardTitle className='text-xl line-clamp-1'>Expenses by Categories</CardTitle>
        <Select defaultValue={pieType} onValueChange={onTypeChange}>
          <SelectTrigger className='lg:w-auto h-9 rounded-md px-3'>
            <SelectValue placeholder='Chart type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='pie'>
              <div className='flex items-center'>
                <PieChart className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>Pie Chart</p>
              </div>
            </SelectItem>
            <SelectItem value='radar'>
              <div className='flex items-center'>
                <Radar className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>Radar Chart</p>
              </div>
            </SelectItem>
            <SelectItem value='radial'>
              <div className='flex items-center'>
                <Target className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>Radial Chart</p>
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
            {pieType === 'pie' && <PieVariant data={data} />}
            {pieType === 'radar' && <RadarVariant data={data} />}
            {pieType === 'radial' && <RadialVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  )
}
