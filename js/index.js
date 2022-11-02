// const Board = require("./board");
// const Snake = require("./snake");
const SCORE_DIGITS = 4;
let gameStatus = "waiting";
var collisionTimerId = null;
let score = 0;
let level = 1;
const audioPlayer = new Audio();
const musicPlayer = new Audio('./assets/sounds/JasonShaw-JENNYS-THEME.mp3');


const board = new Board(8, 8);
const snake = new Snake(Math.round(board.width / 2), Math.round(board.height / 2));
let itens = [];

function addItens(){
    let qte = (board.width / 2) + (level * 2);
    let itens = [];
    for (let i = 0; itens.length < qte; i++){
        let x = getRandomInt(0, board.width);
        let y = getRandomInt(0, board.height);
        if (!snake.checkCordinateConflict(x, y)){
            let newIndex = chekItemExists(x, y, itens);
            if ( newIndex === -1) { 
                let item = new Item(x, y);
                itens.push(item);
            } else {
                itens.splice(newIndex, 1);
            }
        }
    }
    return itens;
}

function chekItemExists(x, y, arritens){
    let found = -1;
    arritens.forEach( (item, index) => {
        if ( item.x === x && item.y === y) {
            found = index;
        }
    });
    return found;
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
            audioPlayer.setAttribute('src', el.sound);
            audioPlayer.play();
            score += el.points;
            itens.splice(index, 1);
            renderScore();
            if (itens.length === 0){
                levelUpGame();
                speedUp();
            }
            if (score % 100 === 0){
                speedUp();
            }
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

function levelUpGame(){
    pauseGame();
    level++;
    document.querySelector('#level span').innerText = level;
    itens = addItens();
    snake.grow();
    renderItens();
    pauseGame();
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
    return (40000/speed).toFixed(0);
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

    itens = addItens();
    board.render();
    renderItens();
    renderSpeed(snake.speed);
    renderScore();
    snake.render();
}

function endGame(){
    clearInterval(collisionTimerId);
    musicPlayer.pause();
    musicPlayer.currentTime = 0;
    audioPlayer.setAttribute('src', './assets/sounds/nukka.wav');
    audioPlayer.play();
    snake.crash();
    snake.stop();
    let msg = document.querySelector('#game-msg');
    msg.innerHTML = `<h1>Game Over</h1> <p><strong>[F5]</strong> to restart!</p>`;
    msg.style.display = 'flex';
}

function startGame(){
    document.querySelector('.modal-wrapper').style.display = 'none';
    musicPlayer.autoplay = true;
    musicPlayer.volume = 0.1;
    musicPlayer.loop = true;
    musicPlayer.load();
    collisionTimerId = setInterval(() => {
        detectCollision();
    }, snake.speed - 100);
    renderSpeed( snake.start() );
}

function pauseGame(){
    if (gameStatus !== "paused"){
        clearInterval(collisionTimerId);
        document.getElementById("button-pause").innerHTML = `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg> play`;
        gameStatus = "paused";
        musicPlayer.pause();
        snake.stop();
    } else {
        document.getElementById("button-pause").innerHTML = `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg> pause`;
        gameStatus = "running";
        collisionTimerId = setInterval(() => {
            detectCollision();
        }, snake.speed - 100);
        musicPlayer.play();
        renderSpeed( snake.start() );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', event => {
        const key = event.key.toLowerCase();
        // console.log(key);
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

itens = addItens();
board.render();
renderItens();
renderSpeed(snake.speed);
renderScore();
snake.render();
