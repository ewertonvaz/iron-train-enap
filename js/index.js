// const Board = require("./board");
// const Snake = require("./snake");
let gameStatus = "waiting";

const board = new Board(8, 8);
const snake = new Snake(Math.round(board.width / 2), Math.round(board.height / 2));
const elements = [
    new Element(6, 6),
    new Element(2, 2)
];

function renderElements(){
    elements.forEach(el => {
        el.draw();
    });
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
    snake.render();
}

function startGame(){
    document.querySelector('.modal-wrapper').style.display = 'none';
    snake.start();
}

function pauseGame(){
    if (gameStatus !== "paused"){
        document.getElementById("button-pause").innerText = "play"
        gameStatus = "paused";
        snake.stop();
    } else {
        document.getElementById("button-pause").innerText = "pause"
        gameStatus = "running";
        snake.start();
    }
}

board.render();
renderElements();
snake.render();
