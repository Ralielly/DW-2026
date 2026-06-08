import { AppError } from '../errors/AppError.js'

export class TarefaService {
  constructor(repository) {
    this.repository = repository
  }

  async listarTarefas({ busca, status } = {}) {
    const concluido =
      status === 'concluida' ? true :
      status === 'pendente'  ? false :
      undefined

    return this.repository.buscarTodos({ busca, concluido })
  }

  async resumoTarefas() {
    return this.repository.resumo()
  }

  async buscarPorId(id) {
    const tarefa = await this.repository.buscarPorId(id)
    if (!tarefa) throw new AppError('Tarefa não encontrada', 404)
    return tarefa
  }

  async criarTarefa(dados) {
    if (!dados.descricao || dados.descricao.trim() === '') {
      throw new AppError('A descrição é obrigatória', 400)
    }
    return this.repository.salvar({ descricao: dados.descricao.trim(), concluido: false })
  }

  async atualizarTarefa(id, dados) {
    await this.buscarPorId(id)
    return this.repository.atualizar(id, dados)
  }

  async concluirTarefa(id) {
    const tarefa = await this.buscarPorId(id)
    return this.repository.atualizar(id, { concluido: !tarefa.concluido })
  }

  async removerTarefa(id) {
    await this.buscarPorId(id)
    return this.repository.remover(id)
  }
}