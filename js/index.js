// const Board = require("./board");
// const Snake = require("./snake");
const SCORE_DIGITS = 4;
let gameStatus = "waiting";
var collisionTimerId = null;
let score = 0;

const board = new Board(8, 8);
const snake = new Snake(Math.round(board.width / 2), Math.round(board.height / 2));
let itens = addItens();

function addItens(){
    let qte = board.width / 2;
    let itens = [];
    for (let i = 0; itens.length <= qte; i++){
        let x = getRandomInt(0, board.width);
        let y = getRandomInt(0, board.height);
        if (! snake.checkCordinateConflict(x, y)){
            let item = new Item(x, y);
            itens.push(item);
        }
    }
    return itens;
}

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
        if( el.x === snake.getHead().actualPos[0] && el.y === snake.getHead().actualPos[1]) {
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
    let strScore = score > 0 ? score.toFixed(0) : "0";
    let length = strScore.length;
    if (strScore.length === SCORE_DIGITS){
        return strScore;
    }
    for (let i = 0; i <= SCORE_DIGITS - length; i++){
        strScore = '0' + strScore;
    }
    document.querySelector('#score span').innerText = strScore;
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
    itens = addItens();
    renderItens();
    renderSpeed(snake.speed);
    renderScore();
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

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', event => {
        const key = event.key.toLowerCase();
        console.log(key);
        switch (key) {
            case 'arrowup':
                snake.changeDirection('up')
                break;
            case 'arrowdown':
                snake.changeDirection('down')
                break;
            case 'arrowleft':
                snake.changeDirection('left')
                break;
            case 'arrowright':
                snake.changeDirection('right')
                break;
            default:
                break;
        }
    });

    document.addEventListener('keypress', event => {
        const key = event.key.toLowerCase();
        if (key === ' '){
            pauseGame();
        }
    });
});

board.render();
renderItens();
renderSpeed(snake.speed);
renderScore();
snake.render();
