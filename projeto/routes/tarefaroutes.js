import * as tarefaController from '../controllers/tarefacontroller.js'

export default async function tarefasRoutes(server) {
  
  // Listar todas as tarefas
  server.get('/tarefas', (req, rep) => {
    console.log('LOG: Rota GET /tarefas chamada');
    return tarefaController.listarTarefas(req, rep);
  });

  // NOVO ENDPOINT: Listar apenas pendentes
  server.get('/tarefas/pendentes', (req, rep) => {
    console.log('LOG: Rota GET /tarefas/pendentes chamada');
    return tarefaController.listarTarefasPendentes(req, rep);
  });

  // Obter resumo
  server.get('/tarefas/resumo', (req, rep) => {
    console.log('LOG: Rota GET /tarefas/resumo chamada');
    return tarefaController.obterResumo(req, rep);
  });

  // Criar tarefa
  server.post('/tarefas', (req, rep) => {
    console.log('LOG: Rota POST /tarefas chamada');
    return tarefaController.criarTarefa(req, rep);
  });

  // Remover tarefa
  server.delete('/tarefas/:id', (req, rep) => {
    console.log(`LOG: Rota DELETE /tarefas/${req.params.id} chamada`);
    return tarefaController.removerTarefa(req, rep);
  });
}