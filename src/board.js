class Board {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.boardControl = this.generate();
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
}

module.exports = Board;