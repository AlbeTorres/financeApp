import { format } from 'date-fns'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { CustomTooltip } from '../CustomTooltip'

type Props = {
  data?: {
    date: Date
    income: number
    expenses: number
  }[]
}
export const BarVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width={'100%'} height={350}>
      <BarChart data={data}>
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
        <Bar dataKey={'income'} fill='#3b82f6' />
        <Bar dataKey={'expenses'} fill='#f43f5e' />
      </BarChart>
    </ResponsiveContainer>
  )
}
