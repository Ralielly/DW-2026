class Livro {
  constructor(titulo, autor) {
    this.titulo = titulo;
    this.autor = autor;
    this.disponivel = true;
  }

  emprestar() {
    if (!this.disponivel) {
      console.log("Livro indisponível.");
      return;
    }

    this.disponivel = false;
  }

  devolver() {
    this.disponivel = true;
  }

  exibir() {
    const status = this.disponivel ? "Disponível" : "Indisponível";
    return `${this.titulo} — ${this.autor} — ${status}`;
  }
}

class Biblioteca {
  constructor(nome) {
    this.nome = nome;
    this.acervo = [];
  }

  adicionar(livro) {
    this.acervo.push(livro);
  }

  buscar(titulo) {
    return this.acervo.find(livro => livro.titulo === titulo) || null;
  }

  emprestar(titulo) {
    const livro = this.buscar(titulo);

    if (!livro) {
      console.log("Livro não encontrado.");
      return;
    }

    livro.emprestar();
  }

  devolver(titulo) {
    const livro = this.buscar(titulo);

    if (livro) {
      livro.devolver();
    }
  }

  exibirAcervo() {
    this.acervo.forEach(livro => {
      console.log(livro.exibir());
    });
  }
}

const biblioteca = new Biblioteca("Central");

biblioteca.adicionar(new Livro("O Silencio das Aguas", "Brittainy C. Cherry"));
biblioteca.adicionar(new Livro("Dom Casmurro", "Machado de Assis"));
biblioteca.adicionar(new Livro("Assim Que Acaba", "Collen Hoover"));

biblioteca.emprestar("Dom Casmurro");
biblioteca.emprestar("Assim Que Acaba");

biblioteca.devolver("Assim Que Acaba");

biblioteca.exibirAcervo();