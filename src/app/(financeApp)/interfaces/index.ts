export interface Account {
  id: string
  name: string
}
export interface Category {
  id: string
  name: string
}

export interface Transaction {
  id: string
  amount: number
  payee?: string
  accountId: string
  categoryId: string
  notes: string
  date: string
}
