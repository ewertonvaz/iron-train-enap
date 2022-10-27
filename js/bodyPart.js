class BodyPart {
    constructor(x, y) {
        this.actualPos = [x, y];
        this.previousPos = [x, y - 1];
        this.background = "./assets/img/segment.png";
        this.position = null;
    }

    draw(){
        this.position = document.getElementById(`${this.actualPos[0]}_${this.actualPos[1]}`);
        //this.position.innerHTML = this.text ;
        this.position.className = "snake-part";
        this.position.querySelector('img').setAttribute("src", `${this.background}`);
        this.changeDirection("up");
    }

    changeDirection(direction){
        switch (direction){
            case "up":
                this.direction = "up";
                console.log(this.position);
                this.position.querySelector('img').style.transform = "rotate(45deg)";
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
}

class Head extends BodyPart {
    constructor(x, y) {
        super(x, y);
        this.text = "H";
        this.background = "./assets/img/head.png";
    }
}

class Tail extends BodyPart {
    constructor(x, y) {
        super(x, y);
        this.text = "T";
        this.background = "./assets/img/tail.png";
    }

    draw(){
        super.draw();
        if (!(this.actualPos[0] === this.previousPos[0] && this.actualPos[1] === this.previousPos[1])){
            let previous = document.getElementById(`${this.previousPos[0]}_${this.previousPos[1]}`);
            previous.innerHTML = "" ;
            previous.className = "square";
            previous.style.backgroundImage="";
        }
    }
}

class Segment extends BodyPart {
    constructor(x, y) {
        super(x, y);
        this.text = "S";
        this.background = "./assets/img/segment.png";
    }
}

// module.exports = {BodyPart, Head, Tail, Segment};