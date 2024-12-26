import clienteAxios from '../axios'
import {
  CreateAccount,
  DeleteAccountsById,
  FetchAccountById,
  FetchAccounts,
  UpdateAccount,
} from './account.type'

export const fetchAccounts: FetchAccounts = () =>
  clienteAxios.get(`/api/account/`).then(r => r.data)

export const fetchAccountById: FetchAccountById = ({ id }) =>
  clienteAxios.get(`/api/account/`, { params: id }).then(r => r.data)

export const deleteAccount: DeleteAccountsById = async ({ ids }) =>
  clienteAxios.delete(`api/account/`, { data: ids }).then(r => r.data)

export const createAccount: CreateAccount = ({ name }) =>
  clienteAxios.post(`/api/account/`, { data: name }).then(r => r.data)

export const updateAccount: UpdateAccount = ({ id, name }) =>
  clienteAxios.patch(`/api/account/`, { data: name }).then(r => r.data)
