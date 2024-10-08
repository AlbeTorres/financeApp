import { useCategoryState } from '../store/CategorySheetSate'

type Props = {
  categoryId: string
  categoryName: string
}

export const CategoryColumn = ({ categoryId, categoryName }: Props) => {
  const { onOpen } = useCategoryState()
  return (
    <div
      className='flex items-center cursor-pointer hover:underline'
      onClick={() => onOpen(categoryId)}
    >
      {categoryName}
    </div>
  )
}
