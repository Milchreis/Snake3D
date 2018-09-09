class Snake {
    constructor(x, y) {
        this.body = [];
        this.size = 10;
        this.spacing = 3;
        this.xdir = 0;
        this.ydir = 1;
        this.slowness = 30;

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
    }

    checkFood(food) {
        let head = this.getHead()
        if(head.x >= food.x && head.x <= food.x + food.size &&head.x >= food.x 
            && head.x <= food.x + food.size) {
            this.grow()
            return true;
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

    update() {
        if((frameCount % this.slowness) == 0) {
            this.move();
        }
    }

    render() {
        noStroke();
        ambientLight(100);
        pointLight(250, 250, 250, 100, 100, 0);
        ambientMaterial(100);
        
        this.body.forEach(item => {
            push()
            translate(item.x, item.y, (this.size/2) + 1);
            box(this.size);
            pop()
        })
    }

}