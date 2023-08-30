import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.register(cookie)

app.addHook('preHandler', async (request, reply) => {
  console.log(`voce usou o metodo [${request.method}] e a rota ${request.url}`)
})
app.register(transactionsRoutes, {
  prefix: 'transactions',
})
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('http server running!')
  })
