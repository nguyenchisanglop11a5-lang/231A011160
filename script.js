const symbols = ["🍎", "🍌", "🍇", "🍒"];
let cards = [...symbols, ...symbols];

const board = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");
const resetBtn = document.getElementById("reset");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

// Shuffle
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Create board
function createBoard() {
  board.innerHTML = "";
  cards = shuffle(cards);

  cards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${symbol}</div>
      </div>
    `;

    card.addEventListener("click", () => flipCard(card, symbol));
    board.appendChild(card);
  });
}

// Flip logic
function flipCard(card, symbol) {
  if (lockBoard || card.classList.contains("flip")) return;

  card.classList.add("flip");

  if (!firstCard) {
    firstCard = { card, symbol };
    return;
  }

  secondCard = { card, symbol };
  moves++;
  movesDisplay.textContent = moves;

  checkMatch();
}

function checkMatch() {
  if (firstCard.symbol === secondCard.symbol) {
    resetTurn();
    checkWin();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.card.classList.remove("flip");
      secondCard.card.classList.remove("flip");
      resetTurn();
    }, 800);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function checkWin() {
  const flipped = document.querySelectorAll(".card.flip");
  if (flipped.length === cards.length) {
    setTimeout(() => {
      alert(`🎉 Bạn thắng với ${moves} lượt!`);
    }, 300);
  }
}

// Reset game
resetBtn.addEventListener("click", () => {
  moves = 0;
  movesDisplay.textContent = 0;
  firstCard = null;
  secondCard = null;
  createBoard();
});

// Init
createBoard();