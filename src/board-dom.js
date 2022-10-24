// const Board = require("./board");
// const Snake = require("./snake");

const board = new Board(16, 16);
const snake = new Snake();

const gameBoard = document.getElementById('board');


function renderBoard(){
    gameBoard.innerHTML = ""; //Remove todas as div child
    gameBoard.style.gridTemplateColumns = `repeat(${board.width}, 1fr)`;
    gameBoard.style.width = `${board.width * 22 + 16}px`;
    for (let i = 0; i < board.width; i++){
        for (let j = 0; j < board.height; j++){
            let item = document.createElement('div');
            item.className = 'square';
            item.id = `${i}_${j}`;
            let span = document.createElement('span');
            span.title = board.getBoard()[i][j];
            span.appendChild(item);
            gameBoard.appendChild(span);        
        }
    }
}

function renderSnake(snake, board){
    x = Math.round(board.width / 2);
    y = Math.round(board.height / 2);
    for (let i = 0; i < snake.size; i++){
        let position = document.getElementById(`${x}_${y - i}`);
        position.innerHTML = snake.getSnake()[i].text ;
        position.className = "snake-part"
    }
}

function changeBoard(){
    let value = document.getElementById('boardsize').value;
    console.log(value);
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
    renderBoard();
    renderSnake(snake, board);
}

renderBoard();
renderSnake(snake, board);
