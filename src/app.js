/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  const palos = ["♠", "♥", "♦", "♣"];

  const valores = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13"
  ];

  function convertirValor(valor) {
    if (valor === "1") return "A";
    if (valor === "11") return "J";
    if (valor === "12") return "Q";
    if (valor === "13") return "K";
    return valor;
  }

  function generarCartaAleatoria() {
    const paloAleatorio = palos[Math.floor(Math.random() * palos.length)];
    const valorAleatorio = valores[Math.floor(Math.random() * valores.length)];
    const valorConvertido = convertirValor(valorAleatorio);
    return valorConvertido + paloAleatorio;
  }

  function generarCartas() {
    let numeroDeCartas = document.getElementById("numCards").value;
    numeroDeCartas = parseInt(numeroDeCartas);
    const cartas = [];
    for (let i = 0; i < numeroDeCartas; i++) {
      cartas.push(generarCartaAleatoria());
    }
    mostrarCartas(cartas);
    return cartas;
  }

  function mostrarCartas(cartas) {
    const contenedor = document.getElementById("currentCards");
    contenedor.innerHTML = "";
    cartas.forEach(carta => {
      const elementoCarta = document.createElement("div");
      elementoCarta.className = `card ${
        carta.includes("♥") || carta.includes("♦") ? "red" : "black"
      }`;
      elementoCarta.textContent = carta;
      contenedor.appendChild(elementoCarta);
    });
  }

  function ordenarCartas(cartas) {
    const cartasParaOrdenar = cartas.slice();
    const historial = [];

    for (let i = 0; i < cartasParaOrdenar.length - 1; i++) {
      let indiceMenor = i;
      for (let j = i + 1; j < cartasParaOrdenar.length; j++) {
        if (
          compararCartas(cartasParaOrdenar[j], cartasParaOrdenar[indiceMenor]) <
          0
        ) {
          indiceMenor = j;
        }
      }

      historial.push([...cartasParaOrdenar]);

      if (indiceMenor !== i) {
        const temp = cartasParaOrdenar[i];
        cartasParaOrdenar[i] = cartasParaOrdenar[indiceMenor];
        cartasParaOrdenar[indiceMenor] = temp;

        historial.push([...cartasParaOrdenar]);
      }
    }

    mostrarHistorialOrdenamiento(historial);
  }

  function compararCartas(carta1, carta2) {
    const valor1 = carta1.slice(0, -1);
    const valor2 = carta2.slice(0, -1);

    function obtenerValorNumerico(valor) {
      if (valor === "A") return 1;
      if (valor === "K") return 13;
      if (valor === "Q") return 12;
      if (valor === "J") return 11;
      return parseInt(valor);
    }

    const valorNumerico1 = obtenerValorNumerico(valor1);
    const valorNumerico2 = obtenerValorNumerico(valor2);

    return valorNumerico1 - valorNumerico2;
  }

  function mostrarHistorialOrdenamiento(historial) {
    const contenedor = document.getElementById("sortHistory");
    contenedor.innerHTML = "";
    historial.forEach(paso => {
      const elementoPaso = document.createElement("div");
      elementoPaso.className = "sort-step";

      const contenedorCartas = document.createElement("div");
      contenedorCartas.className = "card-container";
      paso.forEach(carta => {
        const elementoCarta = document.createElement("div");
        elementoCarta.className = `card ${
          carta.includes("♥") || carta.includes("♦") ? "red" : "black"
        }`;
        elementoCarta.textContent = carta;
        contenedorCartas.appendChild(elementoCarta);
      });
      elementoPaso.appendChild(contenedorCartas);
      contenedor.appendChild(elementoPaso);
    });
  }

  document
    .getElementById("generateBtn")
    .addEventListener("click", generarCartas);
  document.getElementById("sortBtn").addEventListener("click", function() {
    const cartasActuales = Array.from(
      document.querySelectorAll("#currentCards .card")
    ).map(card => card.textContent);
    ordenarCartas(cartasActuales);
  });

  generarCartas();
};
