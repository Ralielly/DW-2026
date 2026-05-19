class Cliente {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }

  exibir() {
    return `${this.nome} <${this.email}>`;
  }
}

class Pedido {
  constructor(id, cliente) {
    this.id = id;
    this.cliente = cliente;
    this.itens = [];
    this.status = "aberto";
  }

  adicionarItem(descricao, valor) {
    this.itens.push({ descricao, valor });
  }

  total() {
    return this.itens.reduce((soma, item) => soma + item.valor, 0);
  }

  fechar() {
    this.status = "fechado";
  }

  exibir() {
    console.log(`Pedido #${this.id} | Status: ${this.status}`);
    console.log(`Cliente: ${this.cliente.exibir()}`);
    console.log("Itens:");

    this.itens.forEach(item => {
      console.log(`- ${item.descricao}: R$ ${item.valor.toFixed(2)}`);
    });

    console.log(`Total: R$ ${this.total().toFixed(2)}`);
  }
}

const cliente1 = new Cliente("Ana", "ana@email.com");

const pedido1 = new Pedido(1, cliente1);

pedido1.adicionarItem("Teclado", 200);
pedido1.adicionarItem("Mouse", 80);

pedido1.fechar();

pedido1.exibir();