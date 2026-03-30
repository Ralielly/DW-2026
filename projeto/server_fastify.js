// Importa o módulo Fastify
import Fastify from 'fastify'

// Cria uma instância do Fastify
const server = Fastify({ logger: false })

// Rota principal
server.get('/', async (request, reply) => {
  reply.send('Bem-vindo à página inicial!')
})

// Rota /sobre
server.get('/sobre', async (request, reply) => {
  reply.send('Esta é a página Sobre.')
})

// Rota /contato
server.get('/contato', async (request, reply) => {
  reply.send('Página de contato.')
})

// Rota para qualquer outro caminho (404)
server.setNotFoundHandler(async (request, reply) => {
  reply.code(404).send('Página não encontrada.')
})

// Inicia o servidor na porta 3002 usando async/await
const PORT = 3002
try {
  await server.listen({ port: PORT })
  console.log(`Servidor rodando com FASTIFY  na porta ${PORT}`)
} catch (err) {
  // Se ocorrer erro ao iniciar o servidor, mostra o erro no log e encerra o processo
  server.log.error(err)
  process.exit(1)
}