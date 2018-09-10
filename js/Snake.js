class Snake {
    constructor(x, y, size) {
        this.body = [];
        this.size = size || 10;
        this.spacing = 3;
        this.xdir = 0;
        this.ydir = 1;
        this.slowness = 20;

        x = round(x / (this.size+this.spacing)) * (this.size+this.spacing);
        y = round(y / (this.size+this.spacing)) * (this.size+this.spacing);

        this.body.push(createVector(x, y, 0));
    }

    moveLeft() {
        this.xdir = -1;
        this.ydir = 0;
    }

    moveRight() {
        this.xdir = 1;
        this.ydir = 0;
    }

    moveUp() {
        this.ydir = -1;
        this.xdir = 0;
    }
    
    moveDown() {
        this.ydir = 1;
        this.xdir = 0;
    }

    grow() {
        let head = this.getHead()
        this.body.push(createVector(
            head.x + (this.size * this.xdir) + (this.spacing * this.xdir), 
            head.y + (this.size * this.ydir) + (this.spacing * this.ydir),
            0));

        this.slowness = constrain(ceil(this.slowness-0.4), 1, this.slowness);
    }

    isEating(food) {
        let dist = this.getDistance(this.getHead(), food.x, food.y, food.size);
        return dist <= this.size/2;
    }

    isInBody(x, y, size) {
        
        for(let i=0; i<this.body.length-2; i++) {
            let dist = this.getDistance(this.body[i], x, y, size);
            if(dist <= this.size*0.5) {
                return true;
            }
        }
        return false;
    }

    move() {
        let head = this.getHead();
        this.body.push(createVector(
            head.x + (this.size * this.xdir) + (this.spacing * this.xdir), 
            head.y + (this.size * this.ydir) + (this.spacing * this.ydir),
            0
        ));
        this.body.shift();
    }

    getHead() {
        return this.body[this.body.length - 1];
    }

    getTail() {
        return this.body[0];
    }

    getDistance(element, x, y, size) {
        return abs((element.x + this.size)/2 - (x+size)/2) + abs((element.y + this.size)/2 - (y+size)/2);
    }

    update() {
        if((frameCount % this.slowness) == 0) {
            this.move();
        }
    }

    render() {
        noStroke();
        ambientLight(100);
        ambientMaterial(100);
        
        this.body.forEach(item => {
            push()
            translate(item.x, item.y, this.size);
            box(this.size);
            pop()
        })
    }

}