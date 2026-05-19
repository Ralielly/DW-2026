class Placar {
  constructor(timeCasa, timeVisitante) {
    this.timeCasa = timeCasa;
    this.timeVisitante = timeVisitante;
    this.golsCasa = 0;
    this.golsVisitante = 0;
  }

  marcarGol(time) {
    if (time === this.timeCasa) {
      this.golsCasa++;
    } else if (time === this.timeVisitante) {
      this.golsVisitante++;
    } else {
      console.log("Time inválido.");
    }
  }

  exibir() {
    console.log(
      `${this.timeCasa} ${this.golsCasa} x ${this.golsVisitante} ${this.timeVisitante}`
    );
  }

  resultado() {
    if (this.golsCasa > this.golsVisitante) {
      return `Vitória do ${this.timeCasa}`;
    } else if (this.golsVisitante > this.golsCasa) {
      return `Vitória do ${this.timeVisitante}`;
    } else {
      return "Empate";
    }
  }
}

const jogo = new Placar("Flamengo", "Vasco");

jogo.marcarGol("Flamengo");
jogo.marcarGol("Flamengo");
jogo.marcarGol("Vasco");

jogo.exibir();
console.log(jogo.resultado());