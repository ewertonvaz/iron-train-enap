const Snake = require("./snake");
const Board = require("./board");

let snake = new Snake();
let board = new Board(4,4);

console.log(snake);
console.log(board);
console.log(board.boardControl[3][2]);