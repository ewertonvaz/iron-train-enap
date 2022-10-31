// const Board = require("./board");
// const Snake = require("./snake");
const SCORE_DIGITS = 4;
let gameStatus = "waiting";
var collisionTimerId = null;
let score = 0;

const board = new Board(8, 8);
const snake = new Snake(Math.round(board.width / 2), Math.round(board.height / 2));
const itens = [
    new Item(6, 6),
    new Item(2, 2)
];


function collisionBorder(nextPos){
    if( 
        nextPos[0] === -1 ||
        nextPos[0] === board.height ||
        nextPos[1] === -1 ||
        nextPos[1] === board.width
    ) 
    {
        throw new Error('Collision');
    }
}

function collisionItens(nextPos){
    itens.forEach( (el, index) => {
        if( el.x === nextPos[0] && el.y === nextPos[1]) {
            score += el.points;
            itens.splice(index, 1);
            renderScore();
        }
    });
}

function collisionSelf(nextPos){
    snake.snakeControl.forEach( (el) => {
        if( el.actualPos[0] === nextPos[0] && el.actualPos[1] === nextPos[1]) {
            throw new Error('Collision');
        }
    });
}

function detectCollision(){
    let nextPos = snake.nextMove();
    try {
        collisionSelf(nextPos);
        collisionBorder(nextPos);
        collisionItens(nextPos);
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

function renderItens(){
    itens.forEach(el => {
        el.draw();
    });
}

function renderScore() {
    document.querySelector('#score span').innerText = convertScore(score);
}

function renderSpeed(speed) {
    document.querySelector('div.pontuacao p#speed span').innerText = speedToKm(speed);
}

function speedToKm(speed){
    return (40000/speed).toFixed(2);
}

function convertScore(score){
    let strScore = score.toFixed(0);
    if (strScore.length === SCORE_DIGITS){
        return strScore;
    }
    for (let i = 0; i < strScore.length === SCORE_DIGITS; i++){
        strScore += '0';
    }
    return strScore;
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
    renderItens();
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
renderItens();
renderSpeed(snake.speed);
snake.render();
