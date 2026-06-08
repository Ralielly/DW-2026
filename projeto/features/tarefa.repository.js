import client from '../database/client.js'

class TarefaRepository {

  async buscarTodos({ busca, concluido } = {}) {
    const condicoes = []
    const valores = []

    if (busca) {
      valores.push(`%${busca}%`)
      condicoes.push(`descricao ILIKE $${valores.length}`)
    }

    if (concluido !== undefined) {
      valores.push(concluido)
      condicoes.push(`concluido = $${valores.length}`)
    }

    const where = condicoes.length > 0 ? `WHERE ${condicoes.join(' AND ')}` : ''

    const resultado = await client.query(`
      SELECT id, descricao, concluido, criada_em
      FROM tarefas
      ${where}
      ORDER BY id
    `, valores)

    return resultado.rows
  }

  async resumo() {
    const resultado = await client.query(`
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE concluido = true) AS concluidas,
        COUNT(*) FILTER (WHERE concluido = false) AS pendentes
      FROM tarefas
    `)
    return resultado.rows[0]
  }

  async buscarPorId(id) {
    const resultado = await client.query(
      `SELECT id, descricao, concluido, criada_em
       FROM tarefas
       WHERE id = $1`,
      [id]
    )
    return resultado.rows[0] ?? null
  }

  async salvar(tarefa) {
    const resultado = await client.query(
      `INSERT INTO tarefas (descricao, concluido)
       VALUES ($1, $2)
       RETURNING id, descricao, concluido, criada_em`,
      [tarefa.descricao, tarefa.concluido ?? false]
    )
    return resultado.rows[0]
  }

  async atualizar(id, dadosAtualizados) {
    const tarefaAtual = await this.buscarPorId(id)
    if (!tarefaAtual) return null

    const tarefaFinal = { ...tarefaAtual, ...dadosAtualizados, id: tarefaAtual.id }

    const resultado = await client.query(
      `UPDATE tarefas
       SET descricao = $1, concluido = $2
       WHERE id = $3
       RETURNING id, descricao, concluido, criada_em`,
      [tarefaFinal.descricao, tarefaFinal.concluido, id]
    )
    return resultado.rows[0] ?? null
  }

  async remover(id) {
    const resultado = await client.query(
      `DELETE FROM tarefas WHERE id = $1`,
      [id]
    )
    return resultado.rowCount > 0
  }
}

export { TarefaRepository }