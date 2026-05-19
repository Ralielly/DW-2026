class Produto {
  constructor(nome, preco, estoque) {
    this.nome = nome;
    this.preco = preco;
    this.estoque = estoque;
  }

  disponivel() {
    return this.estoque > 0;
  }

  exibir() {
    const status = this.disponivel() ? "Em estoque" : "Fora de estoque";
    console.log(`${this.nome} — R$ ${this.preco.toFixed(2)} — ${status}`);
  }
}

const produto1 = new Produto("Notebook", 3500, 5);
const produto2 = new Produto("Fone de ouvido", 150, 0);

produto1.exibir();
produto2.exibir();