import * as TarefaModel from '../models/tarefamodel.js'

export async function listarTarefas(request, reply) {
  console.log('LOG: Controller listarTarefas executado');
  const tarefas = await TarefaModel.listar();
  return reply.send(tarefas);
}

// Função para o novo endpoint de pendentes
export async function listarTarefasPendentes(request, reply) {
  console.log('LOG: Controller listarTarefasPendentes executado');
  const tarefasPendentes = await TarefaModel.listarPendentes();
  return reply.send(tarefasPendentes);
}

export async function obterResumo(request, reply) {
  console.log('LOG: Controller obterResumo executado');
  const resumo = await TarefaModel.obterResumo();
  return reply.send(resumo);
}

export async function criarTarefa(request, reply) {
  console.log('LOG: Controller criarTarefa executado');
  const { descricao } = request.body;
  
  // Validação de entrada (Camada Controller)
  if (!descricao || descricao.trim() === '') {
    return reply.status(400).send({ status: 'error', message: 'Descrição obrigatória' });
  }

  const novaTarefa = await TarefaModel.criar(descricao);
  return reply.status(201).send(novaTarefa);
}

export async function removerTarefa(request, reply) {
  console.log('LOG: Controller removerTarefa executado');
  const id = Number(request.params.id); // Conversão de tipo (Camada Controller)
  
  const removido = await TarefaModel.remover(id);
  
  if (!removido) {
    return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' });
  }
  return reply.status(204).send();
}