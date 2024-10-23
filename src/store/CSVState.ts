import { create } from 'zustand'

enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT',
}
type Props = {
  isImporting: 'LIST' | 'IMPORT'
  onImport: () => void
  onClose: () => void
}

export const useCSVState = create<Props>(set => ({
  isImporting: VARIANTS.LIST,
  onImport: () => set({ isImporting: 'IMPORT' }),
  onClose: () => set({ isImporting: 'LIST' }),
}))
