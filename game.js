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

const initialValues = {
  roundCounter: 0,
  scoreP1: 0,
  scoreP2: 0,
  cardP1: '',
  cardP2: '',
  roundWinner: '',
};

// deep copy of the initialValues object. These values will change thruout game
let currentGameValues = JSON.parse(JSON.stringify(initialValues));

let deck = getDeck();
deck = shuffle(deck);

let newGameButton = document.getElementById('newGameButton');
let drawCardsButton = document.getElementById('drawCardsButton');

drawCardsButton.addEventListener('click', drawCards);
newGameButton.addEventListener('click', newGame);

function getDeck() {
  const deck = new Array();
  // deck will be an array of {value: '5', suit: 'spades'}
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
  return deck;
}

function drawCards() {
  // draw 2 card objects
  currentGameValues.cardP1 = deck.shift();
  currentGameValues.cardP2 = deck.shift();
  determineWinner(currentGameValues.cardP1, currentGameValues.cardP2);
  currentGameValues.cardP1 = `${currentGameValues.cardP1.value} of ${currentGameValues.cardP1.suit}`;
  currentGameValues.cardP2 = `${currentGameValues.cardP2.value} of ${currentGameValues.cardP2.suit}`;
  increaseRound();
  updateValues();
  if (currentGameValues.roundCounter === 26) {
    drawCardsButton.disabled = true;
    setTimeout(() => {
      announceGameWinner(currentGameValues.scoreP1, currentGameValues.scoreP2);
    }, 1000);
  }
}

function determineWinner(cardP1, cardP2) {
  // convert value into an integer
  let playerOneCardValue = Number(cardP1.value);
  let playerTwoCardValue = Number(cardP2.value);
  // for Aces and face cards, this function avoids a NaN
  if (!playerOneCardValue) {
    playerOneCardValue = convertFaceCards(cardP1);
  }
  if (!playerTwoCardValue) {
    playerTwoCardValue = convertFaceCards(cardP2);
  }

  if (playerOneCardValue > playerTwoCardValue) {
    currentGameValues.roundWinner = 'Player 1 wins this round';
    currentGameValues.scoreP1++;
  } else if (playerOneCardValue < playerTwoCardValue) {
    currentGameValues.roundWinner = 'Player 2 wins this round';
    currentGameValues.scoreP2++;
  } else {
    currentGameValues.roundWinner = 'Tie';
  }
  return currentGameValues.roundWinner;
}

function announceGameWinner(currentGameValues) {
  if (currentGameValues.scoreP1 > currentGameValues.scoreP2) {
    window.alert('Congrats, Player 1. You Win!');
  } else if (currentGameValues.scoreP1 < currentGameValues.scoreP2) {
    window.alert('Congrats, Player 2. You Win!');
  } else {
    window.alert('Tie Game! Play again to determine a winner.');
  }
}

function increaseRound() {
  currentGameValues.roundCounter++;
}

function convertFaceCards(card) {
  switch (card.value) {
    case 'J':
      return 11;
    case 'Q':
      return 12;
    case 'K':
      return 13;
    case 'A':
      return 1;
    default:
      return;
  }
}

function newGame() {
  deck = shuffle(getDeck());
  window.alert('Shuffling Deck...');
  currentGameValues = Object.assign({}, initialValues);

  updateValues();
}

function updateValues() {
  document.getElementById('roundCounter').innerText =
    'Round: ' + currentGameValues.roundCounter;
  document.getElementById('scoreP1').innerText =
    'Player 1 Score: ' + currentGameValues.scoreP1;
  document.getElementById('scoreP2').innerText =
    'Player 2 Score: ' + currentGameValues.scoreP2;
  document.getElementById('cardP1').innerText =
    'Player 1 Card: ' + currentGameValues.cardP1;
  document.getElementById('cardP2').innerText =
    'Player 2 Card: ' + currentGameValues.cardP2;
  document.getElementById('roundWinner').innerText =
    'Winner: ' + currentGameValues.roundWinner;
  drawCardsButton.disabled = false;
}
