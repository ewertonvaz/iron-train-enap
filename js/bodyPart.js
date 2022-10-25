class BodyPart {
    constructor(x, y) {
        this.actualPos = [x, y];
        this.previousPos = [x, y - 1];
    }

    draw(){
        let position = document.getElementById(`${this.actualPos[0]}_${this.actualPos[1]}`);
        position.innerHTML = this.text ;
        position.className = "snake-part"
    }
}

class Head extends BodyPart {
    constructor(x, y) {
        super(x, y);
        this.text = "H";
    }
}

class Tail extends BodyPart {
    constructor(x, y) {
        super(x, y);
        this.text = "T";
    }

    draw(){
        super.draw();
        if (!(this.actualPos[0] === this.previousPos[0] && this.actualPos[1] === this.previousPos[1])){
            let previous = document.getElementById(`${this.previousPos[0]}_${this.previousPos[1]}`);
            previous.innerHTML = "" ;
            previous.className = "square"
        }
    }
}

class Segment extends BodyPart {
    constructor(x, y) {
        super(x, y);
        this.text = "S";
    }
}

// module.exports = {BodyPart, Head, Tail, Segment};