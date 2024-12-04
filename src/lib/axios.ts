import axios from 'axios'

const clienteAxios = axios.create({
  baseURL: process.env.NEXT_APP_BACKEND_URL,
})

export default clienteAxios
