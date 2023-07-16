import axios from 'axios'

// definindo a rota padrão do backend
export const api = axios.create({
  baseURL: 'http://192.168.15.5:3333',
})
