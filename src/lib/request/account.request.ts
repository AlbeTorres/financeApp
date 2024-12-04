import { AccountResponseData, AccountsResponseData } from '@/interfaces'
import clienteAxios from '../axios'

export const fetchAccounts = () =>
  clienteAxios.get(`/api/account/`).then(r => r.data as AccountsResponseData)

export const createAccount = (name: string) =>
  clienteAxios.post(`/api/account/`, { name }).then(r => r.data as AccountResponseData)
