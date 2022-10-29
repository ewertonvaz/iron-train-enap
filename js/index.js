// const Board = require("./board");
// const Snake = require("./snake");

const board = new Board(16, 16);
const snake = new Snake(Math.round(board.width / 2), Math.round(board.height / 2));
const elements = [
    new Element(12, 12),
    new Element(4, 4)
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
            board.changeDimensions(16, 16);
            break;
        case "1":
            board.changeDimensions(24, 24);
            break;
        case "2":
            board.changeDimensions(32, 32);
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
    snake.start();
}

function stopGame(){
    snake.stop();
}

board.render();
renderElements();
snake.render();
