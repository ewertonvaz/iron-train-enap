// const BodyPart = require("./bodyPart");
// const Head = require("./bodyPart");

// const { Head, Tail, Segment } = require("./bodyPart");

class Snake {
    constructor(x, y){
        this.size = 3;       
        this.direction = "left";
        this.snakeControl = [];
        this.generate(x, y);
    }

    generate(x, y){
        this.snakeControl.push(new Head(x, y));
        this.snakeControl.push( new Segment(x, y - 1));
        this.snakeControl.push(new Tail(x, y - 2));
    }

    getSnake() {
        return this.snakeControl;
    }

    changeDirection(direction){
        switch (direction){
            case "up":
                console.log("up");
                break;
            case "down":
                console.log("down");
                break;
            case "left":
                console.log("left");
                break;
            case "right":
                console.log("right");
                break;
            default:
                console.log("no-direction")
                break;
        }
    }

    moveLeft(){}

    moveRight(){}

    moveUp(){}

    moveDown() {}
}

// module.exports = Snake;