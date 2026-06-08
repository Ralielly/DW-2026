// @file: src/features/tarefas/tarefa.routes.js

import { TarefaRepository } from './tarefa.repository.js'
import { TarefaService } from './tarefa.service.js'
import { TarefaController } from './tarefa.controller.js'

export default async function tarefaRoutes(server) {
  const repository = new TarefaRepository()
  const service = new TarefaService(repository)
  const controller = new TarefaController(service)

  server.get('/', (request, reply) =>
    controller.listar(request, reply)
  )

  server.post('/', (request, reply) =>
    controller.criar(request, reply)
  )

  server.get('/resumo', (request, reply) =>
    controller.resumo(request, reply)
  )

  server.get('/:id', (request, reply) =>
    controller.buscar(request, reply)
  )

  server.patch('/:id', (request, reply) =>
    controller.atualizar(request, reply)
  )

  server.patch('/:id/concluir', (request, reply) =>
    controller.concluir(request, reply)
  )

  server.delete('/:id', (request, reply) =>
    controller.remover(request, reply)
  )
}