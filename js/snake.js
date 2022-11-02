// const BodyPart = require("./bodyPart");
// const Head = require("./bodyPart");

// const { Head, Tail, Segment } = require("./bodyPart");

const SPEED_INCREMENT = 100;
const MAX_SPEED = 100;

class Snake {
    constructor(x, y){    
        this.direction = "right";
        this.snakeControl = [];
        this.speed = 1500;
        this.generate(x, y);
    }

    checkCordinateConflict(x, y) {
        for ( let i = 0; i < this.snakeControl.length; i++){
            if (
                this.snakeControl[i].actualPos[0] === x &&
                this.snakeControl[i].actualPos[1] === y
            ) {
                return true;
            }
        }
        return false;
    }

    generate(x, y){
        this.snakeControl.unshift(new Head(x, y));
        this.snakeControl.unshift( new Segment(x, y - 1));
        this.snakeControl.unshift(new Tail(x, y - 2, true));
    }

    getSnake() {
        return this.snakeControl;
    }

    grow(){
        let tailActual = [...this.snakeControl[0].actualPos];
        let tailPrevious = [...this.snakeControl[0].previousPos];
        let newItem = new Segment(0, 0);
        newItem.actualPos = tailActual;
        newItem.previousPos = tailPrevious;
        // console.log(newItem);
        //Insere um item antes da cauda (Tail)
        this.snakeControl.splice(1, 0, newItem);
        this.snakeControl[0].previousPos = tailActual;
        //this.snakeControl[0].actualPos = 
    }

    increaseSpeed(){
        this.stop();
        // Calcula nova velocidade
        if (this.speed > MAX_SPEED * 4 ) {
            this.speed -= SPEED_INCREMENT;
        } else if (this.speed > MAX_SPEED) {
             this.speed -=  SPEED_INCREMENT / 4;
        } else {
            this.speed = MAX_SPEED;
        }
        this.start();
    }

    // changePosition(x, y) {
    //     this.direction = "right";
    //     for (let i = this.size() - 1;  i >= 0; i--) {
    //         this.snakeControl[i].actualPos = [x, y - (this.size() - 1 - i)] 
    //         this.snakeControl[i].previousPos = [x, y - (this.size() - i)];
    //     }
    // }

    changeDirection(direction){
        switch (direction){
            case "up":
                this.direction = "up";
                break;
            case "down":
                this.direction = "down";
                break;
            case "left":
                this.direction = "left";
                break;
            case "right":
                this.direction = "right";
                break;
            default:
                this.direction = "unknown";
                break;
        }
    }

    size(){
        return this.snakeControl.length;
    }

    nextMove(){
        let nextPos = [ ...this.snakeControl[this.size() - 1].actualPos ];
        switch (this.direction) {
            case "right":
                nextPos[1]++;
                break;
            case "left":
                nextPos[1]--;
                break;
            case "up":
                nextPos[0]--;
                break;
            case "down":
                nextPos[0]++;
                break;
        }
        return nextPos;
    }

    move(){
        //1. Guarda as posições anteriores
        for (let i = 0; i < this.size(); i++) {
            let clonePos = [...this.snakeControl[i].actualPos]
            this.snakeControl[i].previousDirection = this.snakeControl[i].actualDirection;
            this.snakeControl[i].previousPos = clonePos;
        }
        //1.

        //2. Altera a posição da head
        switch (this.direction) {
            case "right":
                this.snakeControl[this.size() - 1].actualPos[1]++;
                break;
            case "left":
                this.snakeControl[this.size() - 1].actualPos[1]--;
                break;
            case "up":
                this.snakeControl[this.size() - 1].actualPos[0]--;
                break;
            case "down":
                this.snakeControl[this.size() - 1].actualPos[0]++;
                break;
        }
        this.snakeControl[this.size() - 1].actualDirection = this.direction;
        //2.

        //3. Atualiza a posição dos demais itens
        for (let i = this.size() - 2;  i >= 0; i--) {
            this.snakeControl[i].actualPos = this.snakeControl[i+1].previousPos;
            this.snakeControl[i].actualDirection = this.snakeControl[i+1].previousDirection;
            this.snakeControl[i].corner = this.snakeControl[i+1].getCorner();
        }
        //3.
        //console.log(this.snakeControl);
    }

    render(){
        for (let i = this.snakeControl.length - 1; i >= 0; i--){
           this.snakeControl[i].draw(this.direction);
        }
    }

    crash(){
        this.getHead().background = './assets/img/crash.png';
        this.getHead().draw();
    }

    start(){
        this.snakeMoving = setInterval( () => {
            try {
                this.move();
                this.render();
            } catch (e) {
                console.log(e);
                this.stop();
            }
        }, this.speed );
        return this.speed;
    }

    stop(){
        clearInterval(this.snakeMoving);
    }

    getHead(){
        return this.snakeControl[this.size() - 1];
    }
}

// module.exports = Snake;