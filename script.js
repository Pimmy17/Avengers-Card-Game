class MatchingCards {
  constructor(cards) {
    this.cardsArray = cards;
  }
  startGame() {
    this.cardToCheck = null;
    this.matchedCards = [];
    this.busy = true;
    setTimeout(() => {
      this.shuffleCards(this.cardsArray);
      this.busy = false;
    }, 500);
    this.hideCards();
  }

  victory() {
    document.getElementById("victory-text").classList.add("visible");
  }

  hideCards() {
    this.cardsArray.forEach((card) => {
      card.classList.remove("visible");
    });
  }

  flipCard(card) {
    if (this.canFlipCard(card)) {
      card.classList.add("visible");

      if (this.cardToCheck) {
        this.checkForCardMatch(card);
      } else {
        this.cardToCheck = card;
      }
    }
  }

  checkForCardMatch(card) {
    if (this.getCardType(card) === this.getCardType(this.cardToCheck)) {
      this.cardMatch(card, this.cardToCheck);
    } else {
      this.cardMismatch(card, this.cardToCheck);
    }
    this.cardToCheck = null;
  }
  cardMatch(card1, card2) {
    this.matchedCards.push(card1);
    this.matchedCards.push(card2);
    if (this.matchedCards.length === this.cardsArray.length) {
      this.victory();
    }
  }
  cardMismatch(card1, card2) {
    this.busy = true;
    setTimeout(() => {
      card1.classList.remove("visible");
      card2.classList.remove("visible");
      this.busy = false;
    }, 1000);
  }

  getCardType(card) {
    return card.getElementsByClassName("avenger")[0].src;
  }

  shuffleCards() {
    for (let i = this.cardsArray.length - 1; i > 0; i--) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      this.cardsArray[randIndex].style.order = i;
      this.cardsArray[i].style.order = randIndex;
    }
  }

  canFlipCard(card) {
    return (
      !this.busy &&
      !this.matchedCards.includes(card) &&
      card !== this.cardToCheck
    );
  }
}

ready();

function ready() {
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));
  let cards = Array.from(document.getElementsByClassName("card"));
  let game = new MatchingCards(cards);

  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      game.startGame();
    });
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      game.flipCard(card);
    });
  });
}
