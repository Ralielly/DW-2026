function processarPagamento(valor) {
  if (valor <= 0) {
    throw new Error("Valor inválido");
  }

  return "Pagamento aprovado";
}

try {
  console.log(processarPagamento(100));
} catch (erro) {
  console.log(erro.message);
}