// const Board = require("./board");
// const Snake = require("./snake");
let gameStatus = "waiting";
var collisionTimerId = null;

const board = new Board(8, 8);
const snake = new Snake(Math.round(board.width / 2), Math.round(board.height / 2));
const elements = [
    new Element(6, 6),
    new Element(2, 2)
];
function collisionSelf(){
    let nextPos = snake.nextMove();
    snake.snakeControl.forEach( (el) => {
        if( el.actualPos[0] === nextPos[0] && el.actualPos[1] === nextPos[1]) {
            throw new Error('Collision');
        }
    });
}

function detectCollision(){
    try {
        collisionSelf();
    } catch (e) {
        console.log(e);
        endGame();
    }
}

function speedUp(){
    clearInterval(collisionTimerId);
    snake.increaseSpeed();
    renderSpeed(snake.speed);
    collisionTimerId = setInterval(() => {
        detectCollision();
    }, snake.speed - 100);
}

function renderElements(){
    elements.forEach(el => {
        el.draw();
    });
}

function renderSpeed(speed) {
    document.querySelector('div.pontuacao p#speed span').innerText = speedToKm(speed);
}

function speedToKm(speed){
    return (40000/speed).toFixed(2);
}

function changeBoard(){
    let value = document.getElementById('boardsize').value;
    switch (value){
        case "0":
            board.changeDimensions(8, 8);
            break;
        case "1":
            board.changeDimensions(16, 16);
            break;
        case "2":
            board.changeDimensions(24, 24);
            break;
        default:
            board.changeDimensions(8, 8);
            break;
    }

    snake.changePosition(Math.round(board.width / 2), Math.round(board.height / 2));

    board.render();
    renderElements();
    renderSpeed(snake.speed);
    snake.render();
}

function endGame(){
    clearInterval(collisionTimerId);
    snake.crash();
    snake.stop();
}

function startGame(){
    document.querySelector('.modal-wrapper').style.display = 'none';
    collisionTimerId = setInterval(() => {
        detectCollision();
    }, snake.speed - 100);
    renderSpeed( snake.start() );
}

function pauseGame(){
    if (gameStatus !== "paused"){
        clearInterval(collisionTimerId);
        document.getElementById("button-pause").innerText = "play"
        gameStatus = "paused";
        snake.stop();
    } else {
        document.getElementById("button-pause").innerText = "pause"
        gameStatus = "running";
        collisionTimerId = setInterval(() => {
            detectCollision();
        }, snake.speed - 100);
        renderSpeed( snake.start() );
    }
}

board.render();
renderElements();
renderSpeed(snake.speed);
snake.render();
