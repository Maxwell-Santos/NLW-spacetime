import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'

const app = fastify()

app.register(cors, {
  // um caso é quando origin: ('http://localhost/', 'http://seudominio.com')
  origin: true, // todas url de frontend poderão acessar o nosso back-end
})

app.register(jwt, {
  secret: 'spacetime',
})

app.register(authRoutes)
app.register(memoriesRoutes)
// localhost:3333
app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP rodando o servidor no http://localhost:3333')
  })
