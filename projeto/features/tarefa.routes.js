// @file: src/features/tarefas/tarefa.routes.js

import { TarefaRepository } from './tarefa.repository.js'
import { TarefaService } from './tarefa.service.js'
import { TarefaController } from './tarefa.controller.js'

export default async function tarefaRoutes(server) {

  // ==========================================
  // INJEÇÃO DE DEPENDÊNCIA
  // ==========================================

  const repository = new TarefaRepository()
  const service = new TarefaService(repository)
  const controller = new TarefaController(service)

  // ==========================================
  // ROTAS
  // ==========================================

  server.get('/tarefas', (request, reply) =>
    controller.listar(request, reply)
  )

  server.post('/tarefas', (request, reply) =>
    controller.criar(request, reply)
  )

  server.get('/tarefas/:id', (request, reply) =>
    controller.buscar(request, reply)
  )

  server.patch('/tarefas/:id', (request, reply) =>
    controller.atualizar(request, reply)
  )

  server.patch('/tarefas/:id/concluir', (request, reply) =>
    controller.concluir(request, reply)
  )

  server.delete('/tarefas/:id', (request, reply) =>
    controller.remover(request, reply)
  )
}