class Element {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.position = "";
        this.background = "./assets/img/coin.svg";
    }

    draw(){
        this.position = document.getElementById(`${this.x}_${this.y}`);
        console.log(this);
        this.position.className = "element-draw";
        this.position.querySelector('img').setAttribute("src", `${this.background}`);
    }
}