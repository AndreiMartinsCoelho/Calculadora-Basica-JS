const AnteriorOPText = document.querySelector("#op-anterior");
const AtualOPText = document.querySelector("#op-atual");
const buttons = document.querySelectorAll("#button-container button");

class Calcul {
  constructor(AnteriorOPText, AtualOPText) {
    this.AnteriorOPText = AnteriorOPText;
    this.AtualOPText = AtualOPText;
    this.AtualOP = "";
  }

  addDigit(digito) {
    console.log(digito);
    if (digito === "." && this.AtualOPText.innerText.includes(".")) {
      return;
    }
    this.AtualOP = digito;
    this.updateTELA();
  }

  processOP(operacao) {
    if (this.AtualOPText.innerText === "" && operacao !== "C") {
      if (this.AnteriorOPText.innerText !== "") {
        this.MudeOP(operacao);
      }
      return;
    }
    let operacaoValue;
    let anterior = +this.AnteriorOPText.innerText.split(" ")[0];
    let atual = +this.AtualOPText.innerText;
    switch (operacao) {
      case "+":
        operacaoValue = anterior + atual;
        this.updateTELA(operacaoValue, operacao, atual, anterior);
        break;
      case "-":
        operacaoValue = anterior - atual;
        this.updateTELA(operacaoValue, operacao, atual, anterior);
        break;
      case "X":
        operacaoValue = anterior * atual;
        this.updateTELA(operacaoValue, operacao, atual, anterior);
        break;
      case "/":
        operacaoValue = anterior / atual;
        this.updateTELA(operacaoValue, operacao, atual, anterior);
        break;
      case "DEL":
        this.proceDELOP();
        break;
      case "AC":
        this.proceLIMPAtual();
        break;
      case "=":
        this.proceIGUALOP();
        break;
      default:
        return;
    }
  }

  updateTELA(operacaoValue = null, operacao = null, atual = null, anterior = null){
    if (operacaoValue === null) {
      this.AtualOPText.innerText += this.AtualOP;
    } else {
      if (anterior === 0) {
        operacaoValue = atual;
      }
      this.AnteriorOPText.innerText = `${operacaoValue} ${operacao}`;
      this.AtualOPText.innerText = "";
    }
  }

  MudeOP(operacao) {
    const OPMatematico = ["X", "-", "+", "/"];
    if (!OPMatematico.includes(operacao)) {
    return;
    }
    this.AnteriorOPText.innerText =
    this.AnteriorOPText.innerText.slice(0, -1) + operacao;
  }

  proceDELOP() {
    this.AtualOPText.innerText =
    this.AnteriorOPText.innerText.slice(0, -1);
  }

  proceLIMPAtual() {
    this.AtualOPText.innerText = "";
  }

  proceIGUALOP() {
    let operacao = this.AnteriorOPText.innerText.split(" ")[1];
    this.processOP(operacao);
  }
}

const calc = new Calcul(AnteriorOPText, AtualOPText);
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;
    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOP(value);
    }
  });
});
