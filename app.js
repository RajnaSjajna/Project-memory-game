const cards = document.querySelectorAll('.card');
let flippedCards = [];
let lockBoard = false;
let moves = 0;
let timerInterval = null;
let timeLeft = 50;

const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');

// Funkcija za miješanje kartica
function shuffleCards() {
    const gameBoard = document.getElementById('gameBoard');
    const shuffledCards = Array.from(cards).sort(() => Math.random() - 0.5);
    shuffledCards.forEach(card => gameBoard.appendChild(card));
}

// Funkcija koja okreće karticu
function flipCard() {
    if (!timerInterval) startTimer(); // pokreće se samo jednom
    if (lockBoard) return;
    if (this === flippedCards[0]) return;

    this.classList.add('flip');
    flippedCards.push(this);

    // Ako je samo jedna kartica otvorena, pokreni automatsko vraćanje
    if (flippedCards.length === 1) {
        setTimeout(() => {
            if (flippedCards.length === 1) {
                flippedCards[0].classList.remove('flip');
                flippedCards = [];
            }
        }, 1000);
    }

    // Ako su otvorene dvije, provjeri poklapanje
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Provjera da li se slike poklapaju
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.classList[1] === card2.classList[1];

    isMatch ? disableCards() : unflipCards();
    moves++;
    movesDisplay.textContent = moves;
}

// Ako su iste – ostaju otvorene
function disableCards() {
    flippedCards.forEach(card => card.removeEventListener('click', flipCard));
    resetBoard();
}

// Ako nisu iste – vrati ih nazad
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        flippedCards.forEach(card => card.classList.remove('flip'));
        resetBoard();
    }, 1000);
}

// Reset stanja za sledeći potez
function resetBoard() {
    [flippedCards, lockBoard] = [[], false];
}

// Tajmer koji odbrojava
function startTimer() {
    timeLeft = 50;
    timerDisplay.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            stopTimer();
            endGame();
        }
    }, 1000);
}

// Zaustavlja tajmer
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// Kraj igre kada istekne vrijeme
function endGame() {
    lockBoard = true;
    cards.forEach(card => card.removeEventListener('click', flipCard));

    // Prikaži poruku u centru
    message.textContent = "Time's up!";
    message.classList.remove('hidden');
    message.classList.add('show');

    // Nakon 3 sekunde sakrij poruku i resetuj igru
    setTimeout(() => {
        message.classList.remove('show');
        message.classList.add('hidden');
        resetGame();
    }, 3000);
}

// Resetuje igru
function resetGame() {
    stopTimer();
    timeLeft = 50;
    timerDisplay.textContent = timeLeft;

    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });

    moves = 0;
    movesDisplay.textContent = moves;
    resetBoard();
    lockBoard = false;
    shuffleCards();
}

// Dugme za novu igru
resetButton.addEventListener('click', resetGame);

// Pokreni igru
cards.forEach(card => card.addEventListener('click', flipCard));