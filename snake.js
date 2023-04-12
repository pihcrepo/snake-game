const gameBoard = document.querySelector('.game-board')
const score = document.querySelector('.score')
const highScore = document.querySelector('.high-score')
let foodX, foodY
let snakeHeadX = 2, snakeHeadY = 2
let snakeBody = []
let X = 0, Y = 0
let gameOver = false
let setIntervalId
let point = 0;
let highPoint = localStorage.getItem('high-score') || 0
highScore.innerText = 'High Score: ' + highPoint

changeFoodPosition()
setIntervalId = setInterval(initGame, 200);
//initGame()
document.addEventListener('keydown', changeSnakeDirection)

function initGame() {
    if (gameOver) return handleGameOver()                   // row / column
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"> </div>`;

    if (snakeHeadX === foodX && snakeHeadY === foodY) {
        snakeBody.push([foodX, foodY])
        changeFoodPosition()
        point++
        score.innerText = 'Score: ' + point
        highPoint = point >= highPoint ? point : highPoint
        localStorage.setItem('high-score', highPoint)
        highScore.innerText = 'High Score: ' + highPoint
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]

    }

    snakeBody[0] = [snakeHeadX, snakeHeadY]

    snakeHeadX += X
    snakeHeadY += Y

    if (snakeHeadX <= 0 || snakeHeadX > 30 || snakeHeadY <= 0 || snakeHeadY > 30) {
        gameOver = true
    }

    for (let i = 0; i < snakeBody.length; i++) {
        html += `<div class="${i === 0 ? 'snake-head' : 'snake-body'}" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true
        }
    }
    gameBoard.innerHTML = html;

}
function changeFoodPosition() {
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 30) + 1
}
function changeSnakeDirection(e) {
    switch (e.key) {
        case 'ArrowUp':
        case 'k':
            if (Y != 1) {
                X = 0
                Y = -1;
            }
            break;
        case 'ArrowDown':
        case 'j':
            if (Y != -1) {
                X = 0
                Y = 1;
            }
            break;
        case 'ArrowLeft':
        case 'h':
            if (X != 1) {
                X = -1;
                Y = 0
            }
            break;
        case 'ArrowRight':
        case 'l ':
            if (X != -1) {
                X = 1;
                Y = 0
            }
            break;
    }
}
function handleGameOver() {
    clearInterval(setIntervalId)
    alert('Game Over! press ok to replay')
    location.reload()
}

