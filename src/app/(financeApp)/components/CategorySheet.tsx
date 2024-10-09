'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Category } from '../interfaces'

import { useCategoryState } from '../store/CategorySheetSate'
import { NewCategoryForm } from './NewCategoryForm'
import { UpdateCategoryForm } from './UpdateCategoryForm'

interface CategoryData {
  state: boolean
  error_code: 401 | 500 | 403 | 404 | 200 | 400
  error: any | null
  message: string | null
  data?: Category
}

export const CategorySheet = () => {
  const [categoryData, setCategoryData] = useState<Category | null>(null)
  const { isOpen, onClose, id, transactionId } = useCategoryState()

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (id) {
        const response = await fetch(`/api/category/${id}`)
        const { data } = (await response.json()) as CategoryData
        if (data) {
          setCategoryData(data)
        } else {
          toast.error('Something went wrong!')
        }
      }
    }

    fetchCategoryData()
  }, [id])

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>{!id ? 'New Category' : 'Edit Category'}</SheetTitle>
          <SheetDescription>
            {id
              ? 'Edit an existing category'
              : 'Create a new category to segment your transactions'}
          </SheetDescription>
        </SheetHeader>
        {id ? (
          <UpdateCategoryForm onClose={onClose} id={id!} defaultValues={categoryData!} />
        ) : (
          <NewCategoryForm transactionId={transactionId} />
        )}
      </SheetContent>
    </Sheet>
  )
}
