const BOARD_WIDTH = 8;
const BOARD_COLOR = '#42032C';
const TILE_SIZE = 32;
const TILE_BORDER = 0;

class Board {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.boardControl = this.generate();
        this.gameBoard = document.getElementById('board');
    }

    generate(){
        let arrayGenerated = [];
        for (let i = 0; i < this.width; i++){
            arrayGenerated.push([]);
            for (let j = 0; j < this.height; j++){
                arrayGenerated[i].push(`${i},${j}`);
            }
        }
        return arrayGenerated;
    }

    changeDimensions(width, height) {
        this.width = width;
        this.height = height;
        this.boardControl = this.generate();
    }

    getBoard() {
        return this.boardControl;
    }

    moveHit(){}

    render(){
        this.gameBoard.innerHTML = ""; //Remove todas as div child
        this.gameBoard.style.gridTemplateColumns = `repeat(${board.width}, 1fr)`;
        this.gameBoard.style.width = `${ board.width * (TILE_SIZE + TILE_BORDER * 2) }px`;
        this.gameBoard.style.border = `${BOARD_WIDTH}px solid ${BOARD_COLOR}`;
        for (let i = 0; i < board.width; i++){
            for (let j = 0; j < board.height; j++){
                let item = document.createElement('div');
                item.style.width = `${TILE_SIZE}px`;
                item.style.height = `${TILE_SIZE}px`;
                item.className = 'square';
                item.style.border = `${TILE_BORDER}px solid lightgray`;
                item.id = `${i}_${j}`;
                let span = document.createElement('span');
                let img = document.createElement('img');
                img.className = "fundo";
                img.style.width = "100%";
                item.appendChild(img);
                span.title = board.getBoard()[i][j];
                span.appendChild(item);
                this.gameBoard.appendChild(span);
            }
        }
    }
}

// module.exports = Board;