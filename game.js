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

// use this to reset values when there's a new game
const initialValues = {
  roundCounter: 0,
  scoreP1: 0,
  scoreP2: 0,
  cardP1: '...',
  cardP2: '...',
  roundWinner: '...',
};

// deep copy of the initialValues object. These values will change thruout game without impacting the initialValues object
let currentGameValues = JSON.parse(JSON.stringify(initialValues));

// get the initial deck and shuffle when game first loads
let deck = getDeck();
deck = shuffle(deck);

// buttons
let newGameButton = document.querySelector('#new-game-button');
let drawCardsButton = document.querySelector('#draw-cards-button');
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
  // update value of cards from an object to a string
  currentGameValues.cardP1 = `${currentGameValues.cardP1.value} of ${currentGameValues.cardP1.suit}`;
  currentGameValues.cardP2 = `${currentGameValues.cardP2.value} of ${currentGameValues.cardP2.suit}`;

  increaseRound();
  updateValues();
  // when all cards have been used, announce winner
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
    currentGameValues.roundWinner = 'Player 1';
    currentGameValues.scoreP1++;
  } else if (playerOneCardValue < playerTwoCardValue) {
    currentGameValues.roundWinner = 'Player 2';
    currentGameValues.scoreP2++;
  } else {
    currentGameValues.roundWinner = 'Tie';
  }
  return currentGameValues.roundWinner;
}

function announceGameWinner(scoreP1, scoreP2) {
  if (scoreP1 > scoreP2) {
    window.alert('Congrats, Player 1. You Win!');
  } else if (scoreP1 < scoreP2) {
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
  document.querySelector('.round').innerText =
    currentGameValues.roundCounter + ' of 26';
  document.querySelector('#p1-score').innerText = currentGameValues.scoreP1;
  document.querySelector('#p2-score').innerText = currentGameValues.scoreP2;
  document.querySelector('#p1-card').innerText = currentGameValues.cardP1;
  document.querySelector('#p2-card').innerText = currentGameValues.cardP2;
  document.querySelector('.round-winner').innerText =
    currentGameValues.roundWinner;
  drawCardsButton.disabled = false;
}
