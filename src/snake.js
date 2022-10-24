class Snake {
    constructor(){
        this.snakeBody = {text: "B"};
        this.snakeHead = {text: "H"};
        this.snakeTail = {text: "T"};
        this.size = 3;       
        this.direction = "left";
        this.snakeControl = [];
        this.generate();
    }

    generate(){
        this.snakeControl.push(this.snakeTail);
        for(let i = 0; i < this.size - 2; i++){
            this.snakeControl.push(this.snakeBody);
        }
        this.snakeControl.push(this.snakeHead);
    }

    getSnake() {
        return this.snakeControl;
    }

    moveLeft(){}

    moveRight(){}

    moveUp(){}

    moveDown() {}
}

module.exports = Snake;