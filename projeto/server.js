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

// 🔹 GET - Listar tarefas com filtros
server.get('/tarefas', async (request, reply) => {
    let resultado = tarefas

    const { busca, concluido } = request.query

    // Filtro por descrição
    if (busca) {
        resultado = resultado.filter(t =>
            t.descricao.toLowerCase().includes(busca.toLowerCase())
        )
    }

    // Filtro por concluído
    if (concluido !== undefined) {
        const concluidoBoolean = concluido === 'true'

        resultado = resultado.filter(t =>
            t.concluido === concluidoBoolean
        )
    }

    return resultado
})

// 🔹 POST - Criar nova tarefa com validação
server.post('/tarefas', async (request, reply) => {

    const { descricao, concluido } = request.body

    // Validação
    if (!descricao || descricao.trim() === '') {
        return reply.status(400).send({
            status: 'error',
            message: 'A descrição da tarefa é obrigatória.'
        })
    }

    const novoId = tarefas.length > 0 
        ? tarefas[tarefas.length - 1].id + 1 
        : 1

    const novaTarefa = {
        id: novoId,
        descricao: descricao.trim(),
        concluido: concluido ?? false
    }

    tarefas.push(novaTarefa)

    return reply.status(201).send(novaTarefa)
})

// 🔹 GET por ID
server.get('/tarefas/:id', async (request, reply) => {
    const id = Number(request.params.id)

    const tarefa = tarefas.find(t => t.id === id)

    if (!tarefa) {
        return reply.status(404).send({
            status: 'error',
            message: 'Tarefa não encontrada'
        })
    }

    return tarefa
})

// 🔹 DELETE
server.delete('/tarefas/:id', async (request, reply) => {
    const id = Number(request.params.id)

    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) {
        return reply.status(404).send({
            status: 'error',
            message: 'Tarefa não encontrada'
        })
    }

    tarefas.splice(index, 1)

    return reply.status(204).send()
})

// 🔹 404 global
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