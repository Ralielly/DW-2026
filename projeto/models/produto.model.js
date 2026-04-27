export default class ProdutoModel {
  #produtos = [
    { id: 1, nome: "Notebook", preco: 3500 },
    { id: 2, nome: "Mouse", preco: 80 },
    { id: 3, nome: "Monitor", preco: 900 }
  ];

  #proximoId = 4;

  async findAll() {
    return this.#produtos;
  }

  async findById(id) {
    return this.#produtos.find(produto => produto.id === id);
  }

  async create(dados) {
    const novoProduto = {
      id: this.#proximoId,
      nome: dados.nome,
      preco: dados.preco
    };

    this.#produtos.push(novoProduto);
    this.#proximoId++;

    return novoProduto;
  }

  async delete(id) {
    const indice = this.#produtos.findIndex(
      produto => produto.id === id
    );

    if (indice === -1) {
      return false;
    }

    this.#produtos.splice(indice, 1);
    return true;
  }

  static validar(dados) {
    const erros = [];

    if (!dados || !dados.nome || dados.nome.trim() === "") {
      erros.push("Nome é obrigatório.");
    }

    if (
      !dados ||
      dados.preco === undefined ||
      typeof dados.preco !== "number" ||
      dados.preco <= 0
    ) {
      erros.push("Preço deve ser maior que 0.");
    }

    if (erros.length > 0) {
      return {
        valido: false,
        erros
      };
    }

    return {
      valido: true
    };
  }
}