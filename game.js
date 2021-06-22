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

let deck = getDeck();
deck = shuffle(deck);
let roundCounter = 0;
let scoreP1 = 0;
let scoreP2 = 0;
let cardP1 = '';
let cardP2 = '';
let roundWinner = '';

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
  cardP1 = deck.shift();
  cardP2 = deck.shift();
  determineWinner(cardP1, cardP2);
  cardP1 = `${cardP1.value} of ${cardP1.suit}`;
  cardP2 = `${cardP2.value} of ${cardP2.suit}`;
  increaseRound();
  updateValues();
  if (roundCounter === 26) {
    drawCardsButton.disabled = true;
    setTimeout(() => {
      announceGameWinner(scoreP1, scoreP2);
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
    roundWinner = 'Player 1 wins this round';
    scoreP1++;
  } else if (playerOneCardValue < playerTwoCardValue) {
    roundWinner = 'Player 2 wins this round';
    scoreP2++;
  } else {
    roundWinner = 'Tie';
  }
  return roundWinner;
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
  roundCounter++;
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
  roundCounter = 0;
  scoreP1 = 0;
  scoreP2 = 0;
  cardP1 = '';
  cardP2 = '';
  roundWinner = '';
  updateValues();
}

function updateValues() {
  document.getElementById('roundCounter').innerText = 'Round: ' + roundCounter;
  document.getElementById('scoreP1').innerText = 'Player 1 Score: ' + scoreP1;
  document.getElementById('scoreP2').innerText = 'Player 2 Score: ' + scoreP2;
  document.getElementById('cardP1').innerText = 'Player 1 Card: ' + cardP1;
  document.getElementById('cardP2').innerText = 'Player 2 Card: ' + cardP2;
  document.getElementById('roundWinner').innerText = 'Winner: ' + roundWinner;
  drawCardsButton.disabled = false;
}
