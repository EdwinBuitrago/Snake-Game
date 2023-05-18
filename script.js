const board = document.querySelector('board');
const gameScore = document.querySelector('score');
const gameHighScore = document.querySelector('high-score');
const controls = document.querySelectorAll('.controls i');

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let speedX = 0, speedY = 0;
let snakeBody = [];
let intervalId;
let score = 0;

// Get high score from local storage

let highScore = localStorage.getItem('high-score') || 0;
gameHighScore.innerText = `High Score: ${gameHighScore}`;

// psss a random between 1 and 30 as food position

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const GameOver = () => {
    clearInterval(intervalId);
    alert('Game Over! Press OK to play again...');
    location.reload();
};

// Change speed value based on key press

const changeDirection = e => {
    if (e.key === 'arrowUp' && speedY != 1) {
        speedX = 0;
        speedY = -1;
    } else if (e.key === 'arrowDown' && speedY != -1) {
        speedX = 0;
        speedY = -1;
    } else if (e.key === 'arrowLeft' && speedX != 1) {
        speedX = -1;
        speedY = 0;
    } else if (e.key === 'arrowRight' && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
};

// Change direction on key press




