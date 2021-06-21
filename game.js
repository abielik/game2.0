const suits = ['spades', 'hearts', 'clubs', 'diamonds'];
const values = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

function getDeck() {
  const deck = new Array();
  for (let suit of suits) {
    for (let value of values) {
      const card = {
        value,
        suit,
      };
      deck.push(card);
    }
  }
  return deck;
}

function shuffle(deck) {
  // switch the places of 2 random cards, 1000 times
  for (let i = 0; i < 1000; i++) {
    const randomCardIndex1 = Math.floor(Math.random() * deck.length);
    const randomCardIndex2 = Math.floor(Math.random() * deck.length);
    const tempCard = deck[randomCardIndex1];

    deck[randomCardIndex1] = deck[randomCardIndex2];
    deck[randomCardIndex2] = tempCard;
  }
}

function drawCards(deck) {
  return deck.shift();
}

function determineWinner(deck) {
  const playerOneCard = drawCards(deck);
  const playerTwoCard = drawCards(deck);

  if (playerOneCard.value > playerTwoCard.value) {
    return 'Player 1 wins this round';
  } else if (playerOneCard.value < playerTwoCard.value) {
    return 'Player 2 wins this round';
  } else {
    return 'Tie';
  }
}

function newGame() {
  const newDeck = getDeck();
  shuffle(newDeck);
}
