import { TriangleAlertIcon } from 'lucide-react'
import { useCategoryState } from '../../../../store'

type Props = {
  categoryId?: string
  categoryName?: string
  transactionId?: string
}

export const CategoryColumn = ({ categoryId, categoryName, transactionId }: Props) => {
  const { onOpen } = useCategoryState()
  return (
    <div
      className='flex items-center cursor-pointer hover:underline'
      onClick={() => onOpen(categoryId, transactionId)}
    >
      {categoryName ? (
        categoryName
      ) : (
        <span className='flex gap-1 text-red-500'>
          <TriangleAlertIcon className='size-4' /> Uncategorized
        </span>
      )}
    </div>
  )
}
