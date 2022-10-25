class BodyPart {
    constructor(x, y) {
        this.actualPos = [x, y];
        this.previousPos = [x, y];
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
}

class Segment extends BodyPart {
    constructor(x, y) {
        super(x, y);
        this.text = "S";
    }
}

// module.exports = {BodyPart, Head, Tail, Segment};