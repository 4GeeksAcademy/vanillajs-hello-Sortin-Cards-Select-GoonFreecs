/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  let suits = ["♦", "♥", "♠", "♣"];
  let numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K"];

  function generateRandomCard() {
    const suitIndex = Math.floor(Math.random() * suits.length);
    const numberIndex = Math.floor(Math.random() * numbers.length);

    const suit = suits[suitIndex];
    const number = numbers[numberIndex];

    return { suit, number };
  }

  function displayCards(cards) {
    const container = document.getElementById("cardsContainer");
    container.innerHTML = "";
    cards.forEach(card => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardDiv.innerHTML = `
        <div class="top-suit" style="color:${
          card.suit === "♦" || card.suit === "♥" ? "red" : "black"
        }">${card.suit}</div>
        <div class="number">${card.number}</div>
        <div class="bottom-suit" style="color:${
          card.suit === "♦" || card.suit === "♥" ? "red" : "black"
        }">${card.suit}</div>
      `;
      container.appendChild(cardDiv);
    });
  }

  function generateCards(num) {
    let cards = [];
    for (let i = 0; i < num; i++) {
      cards.push(generateRandomCard());
    }
    return cards;
  }

  function drawCards() {
    const numCards = parseInt(document.getElementById("numCards").value);
    if (!isNaN(numCards) && numCards > 0) {
      const cards = generateCards(numCards);
      displayCards(cards);
      return cards;
    }
    return [];
  }

  function compareCards(cardA, cardB) {
    const valueOrder =
      numbers.indexOf(cardA.number) - numbers.indexOf(cardB.number);
    if (valueOrder === 0) {
      return suits.indexOf(cardA.suit) - suits.indexOf(cardB.suit);
    }
    return valueOrder;
  }

  function selectionSort(cards) {
    let sortedCards = [...cards];
    let logChanges = [];
    for (let i = 0; i < sortedCards.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < sortedCards.length; j++) {
        if (compareCards(sortedCards[j], sortedCards[minIndex]) < 0) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [sortedCards[i], sortedCards[minIndex]] = [
          sortedCards[minIndex],
          sortedCards[i]
        ];
        logChanges.push([...sortedCards]);
      }
    }
    return { sortedCards, logChanges };
  }

  function displayChanges(logChanges) {
    const logContainer = document.getElementById("changesLog");
    logContainer.innerHTML = "";
    logChanges.forEach((change, index) => {
      const changeDiv = document.createElement("div");
      changeDiv.innerHTML = `Cambio ${index + 1}: ${change
        .map(card => `${card.number}${card.suit}`)
        .join(", ")}`;
      logContainer.appendChild(changeDiv);
    });
  }

  let currentCards = [];

  document.getElementById("drawButton").addEventListener("click", function() {
    currentCards = drawCards();
  });

  document.getElementById("sortButton").addEventListener("click", function() {
    const { sortedCards, logChanges } = selectionSort(currentCards);
    displayCards(sortedCards);
    displayChanges(logChanges);
  });
};
