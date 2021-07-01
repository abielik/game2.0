const suits = ['S', 'H', 'C', 'D'];
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

//newGame();

// use this to reset values when there's a new game
const initialValues = {
  roundCounter: 0,
  scoreP1: 0,
  scoreP2: 0,
  cardP1: '',
  cardP2: '',
};

// deep copy of the initialValues object. These values will change thruout game without impacting the initialValues object
let currentGameValues = JSON.parse(JSON.stringify(initialValues));

// get the initial deck and shuffle when game first loads
let deck = getDeck();
deck = shuffle(deck);

const cardImageP1 = document.querySelector('#p1-card');
const cardImageP2 = document.querySelector('#p2-card');
const newGameButton = document.querySelector('#new-game-button');
const drawCardsButton = document.querySelector('#draw-cards-button');
drawCardsButton.addEventListener('click', drawCards);
newGameButton.addEventListener('click', newGame);

function getDeck() {
  const deck = new Array();
  // deck will be an array of objects {value: '4', suit: 'H', code: '4H'}
  for (let suit of suits) {
    for (let value of values) {
      const card = {
        value,
        suit,
        code: value + suit,
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
  let playerOneCardValue = convertCardValueToNumber(cardP1);
  let playerTwoCardValue = convertCardValueToNumber(cardP2);

  if (playerOneCardValue > playerTwoCardValue) {
    currentGameValues.scoreP1++;
    animateWinningCard(cardImageP1);
  } else if (playerOneCardValue < playerTwoCardValue) {
    currentGameValues.scoreP2++;
    animateWinningCard(cardImageP2);
  } else {
    setTimeout(() => window.alert('Tie!'), 1000);
  }
}

function convertCardValueToNumber(card) {
  const numberValue = Number(card.value);
  // for face cards and aces, NaN is numberValue
  if (!numberValue) {
    return convertFaceCards(card);
  }
  return numberValue;
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

function newGame() {
  deck = shuffle(getDeck());
  window.alert('Shuffling Deck...');
  currentGameValues = Object.assign({}, initialValues);
  updateValues();
  // call the removeAttribue AFTER updateValues(), otherwise blank image shows up on newGame click
  removeImageAttribute();
}

function removeImageAttribute() {
  cardImageP1.removeAttribute('src');
  cardImageP2.removeAttribute('src');
}

function updateValues() {
  document.querySelector('.round').innerText =
    'Round ' + currentGameValues.roundCounter + ' of 26';
  document.querySelector('#p1-score').innerText =
    'Player 1: ' + currentGameValues.scoreP1;
  document.querySelector('#p2-score').innerText =
    'Player 2: ' + currentGameValues.scoreP2;
  document.querySelector(
    '#p1-card'
  ).src = `./cards/${currentGameValues.cardP1.code}.svg`;
  document.querySelector(
    '#p2-card'
  ).src = `./cards/${currentGameValues.cardP2.code}.svg`;
  drawCardsButton.disabled = false;
}

function animateWinningCard(card) {
  card.animate(
    { transform: 'scale(1.5, 1.5)' },
    {
      duration: 1000,
      delay: 500,
      easing: 'ease-in-out',
    }
  );
}
