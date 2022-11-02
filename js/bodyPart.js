class BodyPart {
    constructor(x, y) {
        this.actualPos = [x, y];
        this.previousPos = [x, y - 1];
        this.background = "./assets/img/segment.png";
        this.actualDirection = "right";
        this.previousDirection = "right";
        this.position = null;
        this.corner = 'none';
    }

    getCorner() {
        if (this.actualDirection === this.previousDirection){
            return 'none';
        }
        switch (this.actualDirection) {
            case 'up' :
                switch (this.previousDirection) {
                    case 'left':
                        return 'up-left';
                    case 'right':
                        return 'up-right';
                }
                break;
            case 'down' :
                switch (this.previousDirection){
                    case 'left':
                        return 'down-left';
                    case 'right':
                        return 'down-right';
                }
                break;
            case 'left' :
                switch (this.previousDirection){
                    case 'up':
                        return 'left-up';
                    case 'down':
                        return 'left-down';
                }
                break;
            case 'right' :
                switch (this.previousDirection){
                    case 'up':
                        return 'right-up';
                    case 'down':
                        return 'right-down';
                }
                break;
        }
    }

    changeDirection(){
        switch (this.actualDirection){
            case "up":
                this.position.querySelector('img').style.transform = "rotate(-90deg)";
                break;
            case "down":
                this.position.querySelector('img').style.transform = "rotate(90deg)";
                break;
            case "left":
                this.position.querySelector('img').style.transform = "scaleX(-1)";
                break;
            case "right":
                this.position.querySelector('img').style.transform = "rotate(0deg)";
                break;
            default:
                this.direction = "unknown";
                break;
        }
    }

    draw(){
        this.position = document.getElementById(`${this.actualPos[0]}_${this.actualPos[1]}`);
        //this.position.innerHTML = this.text ;
        this.position.className = "snake-part";
        this.position.querySelector('img').setAttribute("src", `${this.background}`);
        this.changeDirection();
        if (this.corner !== 'none') {
            this.drawCorner(this.corner);
        }
    }

    drawCorner(corner){
        switch (corner){
            case "up-right":
                this.position.querySelector('img').style.transform = "rotate(345deg)";
                break;
            case "up-left":
                this.position.querySelector('img').style.transform = "rotate(252deg)";
                break;
            case "down-right":
                this.position.querySelector('img').style.transform = "rotate(31deg)";
                break;
            case "down-left":
                this.position.querySelector('img').style.transform = "rotate(340deg)";
                break;
            case "left-up":
                this.position.querySelector('img').style.transform = "rotate(17deg)";
                break;
            case "left-down":
                this.position.querySelector('img').style.transform = "rotate(125deg)";
                break;
            case "right-up":
                this.position.querySelector('img').style.transform = "rotate(327deg)";
                break;
            case "right-down":
                this.position.querySelector('img').style.transform = "rotate(62deg)";
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
    constructor(x, y, firstRender) {
        super(x, y);
        this.text = "T";
        this.background = "./assets/img/tail.png";
        this.firstRender = firstRender;
    }

    draw(){
        super.draw();
        if (!this.firstRender){
            if (!(this.actualPos[0] === this.previousPos[0] && this.actualPos[1] === this.previousPos[1])){
                let previous = document.getElementById(`${this.previousPos[0]}_${this.previousPos[1]}`);
                //previous.innerHTML = "" ;
                previous.className = "square";
                previous.querySelector('img').setAttribute("src", "");
            }
        } else {
            this.firstRender = false;
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