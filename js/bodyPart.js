class BodyPart {
    constructor(x, y) {
        this.actualPos = [x, y];
        this.previousPos = [x, y - 1];
        this.background = "./assets/img/segment.png";
        this.position = null;
    }

    draw(direction){
        this.position = document.getElementById(`${this.actualPos[0]}_${this.actualPos[1]}`);
        //this.position.innerHTML = this.text ;
        this.position.className = "snake-part";
        this.position.querySelector('img').setAttribute("src", `${this.background}`);
        this.changeDirection(direction);
    }

    changeDirection(direction){
        switch (direction){
            case "up":
                this.direction = "up";
                this.position.querySelector('img').style.transform = "rotate(-90deg)";
                break;
            case "down":
                this.direction = "down";
                this.position.querySelector('img').style.transform = "rotate(90deg)";
                break;
            case "left":
                this.direction = "left";
                console.log('mudei left');
                this.position.querySelector('img').style.transform = "scaleX(-1)";
                break;
            case "right":
                this.direction = "right";
                this.position.querySelector('img').style.transform = "rotate(0deg)";
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
            //previous.innerHTML = "" ;
            previous.className = "square";
            previous.querySelector('img').setAttribute("src", "");
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