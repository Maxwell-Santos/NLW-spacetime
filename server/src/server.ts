import fastify from 'fastify'
import cors from '@fastify/cors'

const app = fastify()

app.register(cors, {
  // um caso é quando origin: ('http://localhost/', 'http://seudominio.com')
  origin: true, // todas url de frontend poderão acessar o nosso back-end
})

// localhost:3333
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP rodando o servidor no http://localhost:3333')
  })
