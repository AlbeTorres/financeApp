import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { formatPercentage } from '@/lib/utils'
import { CategoryTooltip } from '../CategoryTooltip'

type Props = {
  data?: {
    name: string
    value: number
    percent: number
  }[]
}

const COLORS = ['#0062FF', '#12C6FF', '#FF647F', '#FF9354']
export const PieVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width={'100%'} height={350}>
      <PieChart>
        <Tooltip content={<CategoryTooltip />} />
        <Legend
          layout='horizontal'
          verticalAlign='bottom'
          align='right'
          iconType='circle'
          content={({ payload }: any) => {
            return (
              <ul className='flex flex-col space-y-2'>
                {payload.map((entry: any, index: number) => {
                  console.log(entry)
                  return (
                    <li key={`item-${index}`} className='flex items-center space-x-2'>
                      <span
                        className='size-2 rounded-full'
                        style={{ backgroundColor: entry.color }}
                      />

                      <div className='space-x-1'>
                        <span className='text-sm text-muted-foreground'>{entry.value}</span>
                        <span className='text-sm'>{formatPercentage(entry.payload.percent)}</span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )
          }}
        />
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          outerRadius={90}
          innerRadius={60}
          fill='#8884d8'
          dataKey='value'
          labelLine={false}
        >
          {data?.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
