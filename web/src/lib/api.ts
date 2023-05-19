import axios from 'axios'

// definindo a rota padrão do backend
export const api = axios.create({
  baseURL: 'http://localhost:3333',
})
