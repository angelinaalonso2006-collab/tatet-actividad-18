// Combinaciones ganadoras (índices del tablero)
const COMBINACIONES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
  [0, 4, 8], [2, 4, 6]             // diagonales
];

const celdas = document.querySelectorAll(".celda");
const estado = document.getElementById("estado");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnResetMarcador = document.getElementById("btn-reset-marcador");
const puntosX = document.getElementById("puntos-x");
const puntosO = document.getElementById("puntos-o");
const puntosEmpate = document.getElementById("puntos-empate");

let tablero = Array(9).fill("");
let turno = "X";
let juegoActivo = true;
let marcador = { X: 0, O: 0, empate: 0 };

function jugar(evento) {
  const celda = evento.target;
  const indice = Number(celda.dataset.indice);

  if (!juegoActivo || tablero[indice] !== "") return;

  tablero[indice] = turno;
  celda.textContent = turno;
  celda.classList.add(turno.toLowerCase());
  celda.disabled = true;

  const combinacion = buscarGanador();
  if (combinacion) {
    terminarJuego(`¡Ganó ${turno}!`, turno);
    combinacion.forEach(i => celdas[i].classList.add("ganadora"));
    return;
  }

  if (tablero.every(valor => valor !== "")) {
    terminarJuego("¡Empate!", "empate");
    return;
  }

  turno = turno === "X" ? "O" : "X";
  estado.textContent = `Turno de ${turno}`;
}

function buscarGanador() {
  return COMBINACIONES.find(([a, b, c]) =>
    tablero[a] !== "" && tablero[a] === tablero[b] && tablero[a] === tablero[c]
  );
}

function terminarJuego(mensaje, resultado) {
  juegoActivo = false;
  estado.textContent = mensaje;
  marcador[resultado]++;
  actualizarMarcador();
  celdas.forEach(celda => (celda.disabled = true));
}

function actualizarMarcador() {
  puntosX.textContent = marcador.X;
  puntosO.textContent = marcador.O;
  puntosEmpate.textContent = marcador.empate;
}

function reiniciarPartida() {
  tablero = Array(9).fill("");
  turno = "X";
  juegoActivo = true;
  estado.textContent = "Turno de X";
  celdas.forEach(celda => {
    celda.textContent = "";
    celda.disabled = false;
    celda.classList.remove("x", "o", "ganadora");
  });
}

function reiniciarMarcador() {
  marcador = { X: 0, O: 0, empate: 0 };
  actualizarMarcador();
  reiniciarPartida();
}

celdas.forEach(celda => celda.addEventListener("click", jugar));
btnReiniciar.addEventListener("click", reiniciarPartida);
btnResetMarcador.addEventListener("click", reiniciarMarcador);
