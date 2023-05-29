const board = document.querySelector('.board');
const gameScore = document.querySelector('.score');
const gameHighScore = document.querySelector('.high-score');
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

controls.forEach(button => button.addEventListener('click', () => changeDirection({ key: button.dataset.key })));

const initGame = () => {
    if (gameOver) return GameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // When snake eats food
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); //Add food to snake body array
        score++;
        highScore = score >= highScore ? score : highScore;

        localStorage.setItem('high-score', highScore);
        score.innerText = `Score: ${score}`;
        highScore.innerText = `High Score: ${highScore}`;
    }

    // Update Snake Head
    snakeX += velocityX;
    snakeY += velocityY;

    // Shifting forward values of elements in snake body by one

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    // Check if the snake body is outsite of the limits 

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    // Add div to each part of the snake body

    for (let i = 0; i < snakeBody.length; i++){
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // check if snake head hit the body or not
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    board.innerHTML = html;

}

updateFoodPosition();
intervalId = setInterval(initGame, 100);
document.addEventListener('keyup', changeDirection);


