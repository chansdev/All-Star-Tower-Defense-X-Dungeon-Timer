// Ciclos
const ciclosA = [["04:30:00", "09:00:00", "13:30:00", "18:00:00", "22:30:00"], ["03:00:00", "07:30:00", "12:00:00", "16:30:00", "21:00:00"], ["06:00:00", "10:30:00", "15:00:00", "19:30:00", "00:00:00"]];

const ciclosF = [["05:00:00", "09:30:00", "14:00:00", "18:30:00", "23:00:00"], ["03:30:00", "08:00:00", "12:30:00", "17:00:00", "21:30:00"], ["06:30:00", "11:00:00", "15:30:00", "20:00:00", "00:30:00"]];

function calcCiclo(n) {
  while (n > 3) {
    n -= 3
  }
  
  if (n == 1) {
    return 1
  } else if (n == 2) {
    return 2
  } else {
    return 0
  }
}

// Data
let data = new Date()
data.toLocaleString()

function formHrCiclo(hora) {
  const [h, m, s] = hora.split(":").map(Number)
  const agr = new Date()
  agr.setHours(h, m, s, 0)
  return agr
}

function calcAddDias(mes) {
  let diasAMais = data.getDate()
  
  for (i = mes; i != 0; i--) {
    dias = new Date(data.getFullYear(), i, 0)
    diasAMais += dias.getDate()
  }
  
  return diasAMais
}

// Countdown
class Countdown {
  constructor(dataFutura) {
    this.dataFutura = dataFutura;
  }
  get _dataFutura() {
    return new Date(this.dataFutura);
  }
  get _dataAgora() {
    return new Date();
  }
  get _diferencaDatas() {
    return this._dataFutura.getTime() - this._dataAgora.getTime();
  }
  get horas() {
    return Math.floor(this._diferencaDatas / (60 * 60 * 1000));
  }
  get minutos() {
    return Math.floor(this._diferencaDatas / (60 * 1000));
  }
  get segundos() {
    return Math.floor(this._diferencaDatas / 1000);
  }
  get total() {
    let horas = this.horas % 24;
    let minutos = this.minutos % 60;
    let segundos = this.segundos % 60;
    return {
      horas,
      minutos,
      segundos,
    };
  }
}

function calcHora(ciclo) {
  hora1 = new Date()
  for (let i = 0; i < ciclo.length; i++) {
    hora2 = new Date(formHrCiclo(ciclo[i]))
    if (hora2 > hora1) return i;
  }
  return ciclo[ciclo.length - 1]
}

function formHorario(hora) {
  let horas = hora.split(":").map(Number)
  return horas 
}

let horasADesformatadas = ciclosA[calcCiclo(calcAddDias(data.getMonth()))][calcHora(ciclosA[calcCiclo(calcAddDias(data.getMonth()))])]
let horasFDesformatadas = ciclosF[calcCiclo(calcAddDias(data.getMonth()))][calcHora(ciclosF[calcCiclo(calcAddDias(data.getMonth()))])]
let dataDeAbertura = new Date(
  data.getFullYear(),
  data.getMonth(), data.getDate(),
  formHorario(horasADesformatadas)[0],
  formHorario(horasADesformatadas)[1],
  formHorario(horasADesformatadas)[2]
)
let dataDeFechar = new Date(
  data.getFullYear(),
  data.getMonth(), data.getDate(),
  formHorario(horasFDesformatadas)[0],
  formHorario(horasFDesformatadas)[1],
  formHorario(horasFDesformatadas)[2]
)

let tempoAteAbrir = new Countdown(dataDeAbertura)
let tempoAteFechar = new Countdown(dataDeFechar)

const texto = document.querySelector("#texto")
const textoHoras = document.querySelector("#horas")
const textoMinutos = document.querySelector("#minutos")
const textoSegundos = document.querySelector("#segundos")
const body = document.querySelector("body")

function atualizarDom() {
    data = new Date()
   if (data < dataDeAbertura) {
    texto.textContent = "abrir"
    textoHoras.textContent = tempoAteAbrir.total.horas
    textoMinutos.textContent = tempoAteAbrir.total.minutos
    textoSegundos.textContent = tempoAteAbrir.total.segundos
    body.style.backgroundColor = "red"
  } else if (data >= dataDeAbertura && data <= dataDeFechar) {
    texto.textContent = "fechar"
    textoHoras.textContent = tempoAteFechar.total.horas
    textoMinutos.textContent = tempoAteFechar.total.minutos
    textoSegundos.textContent = tempoAteFechar.total.segundos
    body.style.backgroundColor = "green"
  } else {
    texto.textContent = "abrir"
    textoHoras.textContent = tempoAteAbrir.total.horas
    textoMinutos.textContent = tempoAteAbrir.total.minutos
    textoSegundos.textContent = tempoAteAbrir.total.segundos
    body.style.backgroundColor = "red"
  }
}

setInterval(atualizarDom, 1000)