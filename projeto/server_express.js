// Importa o módulo Express
import express from 'express'

// Cria uma instância do Express
const server = express()

// Rota principal
server.get('/', (req, res) => {
  res.send('Bem-vindo à página inicial!')
})

// Rota /sobre
server.get('/sobre', (req, res) => {
  res.send('Esta é a página Sobre.')
})

// Rota /contato
server.get('/contato', (req, res) => {
  res.send('Página de contato.')
})

// Rota para qualquer outro caminho (404)
server.use((req, res) => {
  res.status(404).send('Página não encontrada.')
})

// Inicia o servidor na porta 3003
const PORT = 3003
server.listen(PORT, () => {
  console.log(`Servidor rodando com EXPRESS  na porta ${PORT}`)
})