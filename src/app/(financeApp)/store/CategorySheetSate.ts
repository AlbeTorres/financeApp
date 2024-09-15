import { create } from 'zustand'
type CategoryState = {
  id?: string
  isOpen: boolean
  onOpen: (id?: string) => void
  onClose: () => void
}

export const useCategoryState = create<CategoryState>(set => ({
  id: undefined,
  isOpen: false,
  onOpen: (id?: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}))
