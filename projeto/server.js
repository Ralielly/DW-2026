import Fastify from 'fastify'
import cors from '@fastify/cors'


// Criamos uma instância do servidor Fastify
const server = Fastify()

server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
})

// Porta do servidor
const PORT = 3000

// "Banco de dados" em memória
const tarefas = [
    { id: 1, descricao: "Fazer compras", concluido: false }, 
    { id: 2, descricao: "Lavar o carro", concluido: false },
    { id: 3, descricao: "Estudar Fastify", concluido: true }
]

// 🔹 GET - Listar tarefas (READ)
server.get('/tarefas', async (request, reply) => {
    return tarefas
})

// 🔹 POST - Criar nova tarefa (CREATE)
server.post('/tarefas', async (request, reply) => {
    const tarefa = request.body

    const novoId = tarefas.length > 0 
        ? tarefas[tarefas.length - 1].id + 1 
        : 1

    const novaTarefa = { id: novoId, ...tarefa }

    tarefas.push(novaTarefa)

    return reply.status(201).send(novaTarefa)
})

server.get('/tarefas/:id', async (request, reply) => {
    // Parâmetros de rota puros extraídos da requisição
    // O conteúdo extraído de request.params é sempre do tipo string, mesmo que seja um número. Por isso, usamos Number() para converter o valor para um tipo numérico.
    const id = Number(request.params.id)

    // O método .find() percorre o array e retorna o primeiro item que satisfaz a condição. Se não encontrar, retorna undefined.
    const tarefa = tarefas.find(t => t.id === id)

    // Se a tarefa não for encontrada, retornamos um status 404 (Not Found) com uma mensagem de erro padronizada. O 'return' é crucial aqui para garantir que a função pare de executar após enviar a resposta.
    if (!tarefa) {
        return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

    // Se a tarefa for encontrada, enviamos os detalhes da tarefa como resposta. O status padrão 200 (OK) é aplicado automaticamente.
    return reply.send(tarefa)
})
server.delete('/tarefas/:id', async (request, reply) => {

    // Extraímos o ID da tarefa a ser excluída a partir dos parâmetros de rota e o convertemos para número.
    const id = Number(request.params.id)
    // Encontramos o índice da tarefa que corresponde ao ID fornecido. O método .findIndex() retorna o índice do primeiro elemento que satisfaz a condição, ou -1 se nenhum elemento for encontrado.
    const index = tarefas.findIndex(t => t.id === id)

    // Se o índice for -1, significa que a tarefa não foi encontrada, e respondemos com um status 404 (Not Found) e uma mensagem de erro. O 'return' é crucial para garantir que a função pare de executar após enviar a resposta.
    if (index === -1) {
        return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

    // O método .splice() é utilizado para remover um item do array. Ele recebe dois argumentos: o índice a partir do qual a remoção deve começar e o número de itens a serem removidos (neste caso, 1).
    tarefas.splice(index, 1)

    // Após a remoção, respondemos com um status 204 (No Content), indicando que a operação foi bem-sucedida, mas não há conteúdo para retornar.
    return reply.status(204).send()
})
server.setNotFoundHandler((request, reply) => {

  return reply.status(404).send({
    status: 'error',
    message: 'O recurso solicitado não existe nesta API.',
  })

})
// Iniciar servidor
const start = async () => {
    try {
        await server.listen({ port: PORT })
        console.log(`Servidor rodando em http://localhost:${PORT}`)
    } catch (erro) {
        console.error(erro)
        process.exit(1)
    }
}

start()