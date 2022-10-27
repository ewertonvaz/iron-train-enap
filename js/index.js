// const Board = require("./board");
// const Snake = require("./snake");

const board = new Board(16, 16);
x = Math.round(board.width / 2);
y = Math.round(board.height / 2);
const snake = new Snake(x, y);
const gameBoard = document.getElementById('board');
const elements = [
    new Element(12, 12),
    new Element(4, 4)
];

function renderBoard(){
    gameBoard.innerHTML = ""; //Remove todas as div child
    gameBoard.style.gridTemplateColumns = `repeat(${board.width}, 1fr)`;
    gameBoard.style.width = `${board.width * 28 + 16}px`;
    for (let i = 0; i < board.width; i++){
        for (let j = 0; j < board.height; j++){
            let item = document.createElement('div');
            item.className = 'square';
            item.id = `${i}_${j}`;
            let span = document.createElement('span');
            let img = document.createElement('img');
            img.className = "fundo";
            img.style.width = "100%";
            item.appendChild(img);
            span.title = board.getBoard()[i][j];
            span.appendChild(item);
            gameBoard.appendChild(span);
        }
    }
}

function renderElements(){
    elements.forEach(el => {
        el.draw();
    });
}

function renderSnake(snake){
    snake.render();
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

    x = Math.round(board.width / 2);
    y = Math.round(board.height / 2);
    snake.changePosition(x, y);

    renderBoard();
    renderElements();
    snake.render();
}

function startGame(){
    snake.start();
}

function stopGame(){
    snake.stop();
}

renderBoard();
renderElements();
snake.render();
