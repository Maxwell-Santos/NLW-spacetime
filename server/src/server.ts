import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient()

// rota de GET
app.get('/users', async () => {
  const users = await prisma.user.findMany()
  return users
})

// localhost:3333
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP rodando o servidor no http://localhost:3333')
  })
