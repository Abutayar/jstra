const FORM_EL = document.querySelector('form');
const PREVIOUS_RECORD_EL = document.querySelector('.previous-guesses');
const MESSAGE_EL = document.querySelector('.message-block');
const GAME_STATE = {
    randomNumber: null,
    previousGuesses: [],
    get tries() {
        return 10;
    },
    get isGameOver() {
        return this.tries === this.previousGuesses.length
    }
}
const MESSAGES = {
    low: 'Wrong! Last guess was too low!',
    high: 'Wrong! Last guess was too high!',
    won: 'Congratulations! You got it right!',
    over: '!!! GAME OVER !!!'
}
FORM_EL.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(FORM_EL);
    const numberValue = parseInt(formData.get('number'));

    if (Number.isNaN(numberValue)) {
        // error handler here
        return;
    }

    verifyUserGuess(numberValue);
})

function getRandomNumberBtwOneAndOneHundred() {
    return Math.floor(Math.random() * 100) + 1
}

function startGame() {
    GAME_STATE.randomNumber = getRandomNumberBtwOneAndOneHundred();
}

function verifyUserGuess(value) {
    GAME_STATE.previousGuesses.push(value);
    if (value === GAME_STATE.randomNumber) {
        MESSAGE_EL.textContent = MESSAGES.won;
        return;
    }
    if (GAME_STATE.isGameOver) {
        MESSAGE_EL.textContent = MESSAGES.over
        return;
    };
    MESSAGE_EL.textContent = value > GAME_STATE.randomNumber ? MESSAGES.high : MESSAGES.low;
}

startGame();