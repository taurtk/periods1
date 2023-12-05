const emojis = ['🐱', '🦄', '🌸', '🍭', '🎀', '🌈', '💖', '🌟'];
const emojiPairs = emojis.concat(emojis); // Duplicate to create pairs

let flippedCards = [];
let matchedPairs = 0;
let score = 0;
let playerName = '';

// Shuffle the cards
emojiPairs.sort(() => Math.random() - 0.5);

// Get elements
const playerNameInput = document.getElementById('playerName');
const scoreDisplay = document.getElementById('scoreDisplay');
const memoryGame = document.getElementById('memoryGame');

// Function to start the game
function startGame() {
  playerName = playerNameInput.value.trim();

  if (!playerName) {
    alert('Please enter your name to start the game.');
    return;
  }

  createBoard();
  score = 0;
  updateScore();
}

// Create the initial game board
function createBoard() {
  memoryGame.innerHTML = '';

  emojiPairs.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.innerHTML = `<span class="hidden">${emoji}</span>`;
    card.addEventListener('click', flipCard);
    memoryGame.appendChild(card);
  });
}

// Function to handle card flips
function flipCard() {
  const card = this;

  if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

// Function to check if flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.innerHTML === card2.innerHTML) {
    // Match found
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);
    matchedPairs++;
    score += 100;

    if (matchedPairs === emojis.length) {
      alert(`Congratulations, ${playerName}! You matched all pairs. Your final score is ${score}.`);
      resetGame();
    }
  } else {
    // No match, flip cards back
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  flippedCards = [];
  updateScore();
}

// Function to update the score display
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

// Function to reset the game
function resetGame() {
  playerNameInput.value = '';
  playerName = '';
  flippedCards = [];
  matchedPairs = 0;
  score = 0;
  updateScore();
  emojiPairs.sort(() => Math.random() - 0.5);
  createBoard();
}
