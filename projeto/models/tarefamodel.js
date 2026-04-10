const tarefas = [
  { id: 1, descricao: "Fazer compras", concluido: false },
  { id: 2, descricao: "Lavar o carro", concluido: false },
  { id: 3, descricao: "Estudar Fastify", concluido: true }
]

export async function listar() {
  console.log('LOG: Model listar chamado');
  return tarefas;
}

// Lógica de filtragem no Model
export async function listarPendentes() {
  console.log('LOG: Model listarPendentes chamado');
  return tarefas.filter(t => t.concluido === false);
}

export async function obterResumo() {
  console.log('LOG: Model obterResumo chamado');
  const total = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluido).length;
  return { total, concluidas, pendentes: total - concluidas };
}

export async function criar(descricao) {
  console.log('LOG: Model criar chamado');
  const novaTarefa = { id: tarefas.length + 1, descricao, concluido: false };
  tarefas.push(novaTarefa);
  return novaTarefa;
}

export async function remover(id) {
  console.log(`LOG: Model remover chamado para ID: ${id}`);
  const index = tarefas.findIndex(t => t.id === id);
  
  if (index === -1) return false;

  // Regra de negócio: Impedir remoção de concluídas (Validação Camada Model)
  if (tarefas[index].concluido) {
    console.log('LOG: Bloqueio de remoção - Tarefa concluída');
    return false; 
  }

  tarefas.splice(index, 1);
  return true;
}