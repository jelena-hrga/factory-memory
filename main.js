let cardsArray = [
  "images/laravel.png",
  "images/pimcore.png",
  "images/remote.png",
  "images/symfony.png",
  "images/php.png",
  "images/vue.png",
  "images/location.png",
  "images/pimconaut.png",
  "images/laravel.png",
  "images/pimcore.png",
  "images/remote.png",
  "images/symfony.png",
  "images/vue.png",
  "images/location.png",
  "images/pimconaut.png",
  "images/php.png",
];

let startScreen = document.querySelector(".start-game");
let gameScreen = document.querySelector(".game-container");
let formScreen = document.querySelector(".game-form");
let endScreen = document.querySelector(".end-screen");

let cardFronts = [...document.querySelectorAll(".card__front")];

let cards = [...document.querySelectorAll(".card")];

let flippedCards = [];

let score = 0;

let rearrangeCards = (array) => {
  let shuffledCards = array.sort((a, b) => 0.5 - Math.random());

  return shuffledCards;
};

cardsArray = rearrangeCards(cardsArray);

cardFronts.forEach((card, index) => {
  card.src = cardsArray[index];
});

cards.forEach((card) => {
  card.addEventListener("click", function () {
    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length == 2) {
      let firstCard = flippedCards[0].querySelector(".card__front");
      let secondCard = flippedCards[1].querySelector(".card__front");

      if (firstCard.src == secondCard.src) {
        score += 1;

        flippedCards = [];

        if (score == 8) {
          finishedGame();
        }
      } else {
        cards.forEach((card) => {
          card.classList.add("disable-click");
        });
        setTimeout(() => {
          flippedCards[0].classList.remove("flipped");
          flippedCards[1].classList.remove("flipped");

          flippedCards = [];
          cards.forEach((card) => {
            card.classList.remove("disable-click");
          });
        }, 1000);
      }
    }
  });
});

function finishedGame() {
  let timeToComplete = timerRef.innerHTML;

  gameScreen.style.display = "none";
  formScreen.style.display = "block";

  document.querySelector(".game-form__time").innerHTML = timeToComplete;

  document
    .querySelector(".game-form__button")
    .addEventListener("click", submitData);
}

function submitData() {
  console.log("submit data");

  // if successfully submitted
  formScreen.style.display = "none";
  endScreen.style.display = "block";

  document
    .querySelector(".end-screen__button")
    .addEventListener("click", function () {
      endScreen.style.display = "none";
      resetGame();
    });
}

let [milliseconds, seconds, minutes] = [0, 0, 0];
let timerRef = document.querySelector(".timer");
let int = null;

document
  .querySelector(".start-game__button")
  .addEventListener("click", function () {
    gameScreen.style.display = "block";
    startScreen.style.display = "none";

    if (int !== null) {
      clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
  });

document.querySelector(".stop-game").addEventListener("click", function () {
  gameScreen.style.display = "none";
  startScreen.style.display = "block";
  resetGame();
});

function resetGame() {
  clearInterval(int);
  [milliseconds, seconds, minutes] = [0, 0, 0];
  timerRef.innerHTML = "00:00:000";
  flippedCards = [];

  startScreen.style.display = "block";

  cards.forEach((card) => {
    card.classList.remove("flipped");
  });
  score = 0;
  cardsArray = rearrangeCards(cardsArray);
  cardFronts.forEach((card, index) => {
    card.src = cardsArray[index];
  });
}

function displayTimer() {
  milliseconds += 10;

  if (milliseconds == 1000) {
    milliseconds = 0;
    seconds++;

    if (seconds == 60) {
      seconds = 0;
      minutes++;
    }
  }

  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;

  timerRef.innerHTML = `${m}:${s}:${ms}`;
}
