class Food {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.size = 10
        this.color = color(255, 0, 0)
    }

    update() {
    }

    render() {
        noStroke();
        ambientLight(100);
        pointLight(250, 250, 250, 100, 100, 0);
        ambientMaterial(this.color);
        
        push()
        translate(this.x, this.y, (this.size/2) + 1);
        box(this.size);
        pop()
    }
}