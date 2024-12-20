import { format } from 'date-fns'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { CustomTooltip } from '../CustomTooltip'

type Props = {
  data?: {
    date: Date
    income: number
    expenses: number
  }[]
}

export const LineVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width={'100%'} height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray={'3 3'} />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={'date'}
          tickFormatter={value => format(value, 'dd MMM')}
          style={{ fontSize: '12px' }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          dataKey={'income'}
          dot={false}
          stroke='#3b82f6'
          strokeWidth={2}
          className='drop-shadow-sm'
        />
        <Line
          dataKey={'expenses'}
          dot={false}
          stroke='#3b82f6'
          strokeWidth={2}
          className='drop-shadow-sm'
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
