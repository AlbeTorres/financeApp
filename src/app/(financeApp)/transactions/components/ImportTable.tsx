import { SelectedColumns } from '@/interfaces'

type Props = {
  headers: string[]
  body: string[][]
  selectedColumns: SelectedColumns
  onTableHeadSelectChange: () => void
}

export const ImportTable = ({ headers, body, selectedColumns, onTableHeadSelectChange }: Props) => {
  return <div>ImportTable</div>
}
