/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  // Lista de palos de la baraja
  const palos = ["♠", "♥", "♦", "♣"];

  // Lista de valores de las cartas (1 al 13)
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

  // Función para convertir valores numéricos a los valores tradicionales de cartas
  function convertirValor(valor) {
    if (valor === "1") return "A";
    if (valor === "11") return "J";
    if (valor === "12") return "Q";
    if (valor === "13") return "K";
    return valor;
  }

  // Función para generar una carta aleatoria
  function generarCartaAleatoria() {
    const paloAleatorio = palos[Math.floor(Math.random() * palos.length)];
    const valorAleatorio = valores[Math.floor(Math.random() * valores.length)];
    const valorConvertido = convertirValor(valorAleatorio);
    return valorConvertido + paloAleatorio;
  }

  // Función para generar un conjunto de cartas
  function generarCartas() {
    let numeroDeCartas = document.getElementById("numCards").value;
    numeroDeCartas = parseInt(numeroDeCartas);
    const cartas = [];
    for (let i = 0; i < numeroDeCartas; i++) {
      cartas.push(generarCartaAleatoria());
    }
    mostrarCartas(cartas);
    limpiarHistorialOrdenamiento();
    return cartas;
  }

  // Función para mostrar las cartas en la pantalla
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

  // Función para ordenar las cartas usando el método de selección
  function ordenarCartas(cartas) {
    const cartasParaOrdenar = cartas.slice(); // Crear una copia para no modificar la lista original
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

      // Registrar el estado actual de las cartas incluso si no hay intercambio
      historial.push([...cartasParaOrdenar]);

      if (indiceMenor !== i) {
        const temp = cartasParaOrdenar[i];
        cartasParaOrdenar[i] = cartasParaOrdenar[indiceMenor];
        cartasParaOrdenar[indiceMenor] = temp;

        // Registrar el estado de las cartas después de realizar un intercambio
        historial.push([...cartasParaOrdenar]);
      }
    }

    mostrarHistorialOrdenamiento(historial); // Mostrar todo el historial de pasos
  }

  // Función para comparar dos cartas (basada en los índices de valores)
  function compararCartas(carta1, carta2) {
    const valor1 = carta1.slice(0, -1);
    const valor2 = carta2.slice(0, -1);
    const indice1 = valores.indexOf(valor1);
    const indice2 = valores.indexOf(valor2);
    return indice1 - indice2;
  }

  // Función para mostrar el historial de ordenamiento
  function mostrarHistorialOrdenamiento(historial) {
    const contenedor = document.getElementById("sortHistory");
    contenedor.innerHTML = "";
    historial.forEach(paso => {
      // Eliminé el "index" para evitar que se muestre
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

  // Función para limpiar el historial de ordenamiento
  function limpiarHistorialOrdenamiento() {
    document.getElementById("sortHistory").innerHTML = "";
  }

  // Agregar eventos a los botones
  document
    .getElementById("generateBtn")
    .addEventListener("click", generarCartas);
  document.getElementById("sortBtn").addEventListener("click", function() {
    const cartasActuales = Array.from(
      document.querySelectorAll("#currentCards .card")
    ).map(card => card.textContent);
    ordenarCartas(cartasActuales);
  });

  // Generar cartas iniciales
  generarCartas();
};
