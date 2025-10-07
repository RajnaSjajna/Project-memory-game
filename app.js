const cards = document.querySelectorAll('.card');
let flippedCards = [];
let lockBoard = false;
let moves = 0;
let timerInterval = null;
let timeLeft = 60;

const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');
const resetButton = document.getElementById('resetButton');

//funkcija za mijesanje kartica
function shuffleCards() {
    const gameBoard = document.getElementById('gameBoard');
    const shuffledCards = Array.from(cards).sort(() => Math.random() - 0.5);
    shuffledCards.forEach(card => gameBoard.appendChild(card));
}


// Funkcija koja okreće karticu
function flipCard() {
    if (!timerInterval) startTimer(); //pokreće se samo jednom
    if (lockBoard) return;
    if (this === flippedCards[0]) return;
    this.classList.add('flip');
    flippedCards.push(this);

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


//timer koji odbrojava
function startTimer() {
    let timeLeft = 60;
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

//funkcija koja zaustavlja tajmer

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

//kraj igre kada istekne vrijeme
function endGame() {
    lockBoard = true; // sprečava dalje okretanje kartica

    // onemogući klikove na sve kartice
    cards.forEach(card => card.removeEventListener('click', flipCard));

    // prikaži poruku
    setTimeout(() => {
        alert("Time's up! Try again!");
    }, 300);
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

// Dugme za novu igru
resetButton.addEventListener('click', () => {
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    moves = 0;
    movesDisplay.textContent = moves;
    timerDisplay.textContent = timer;
    stopTimer();
    resetBoard();
    lockBoard = false;
    shuffleCards();

});

// Pokreni igru
cards.forEach(card => card.addEventListener('click', flipCard));


