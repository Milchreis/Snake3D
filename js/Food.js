class Food {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size || 10;
        this.color = color(255, 0, 0);
    }

    update() {
    }

    render() {
        noStroke();
        ambientLight(100);
        ambientMaterial(this.color);
        
        push();
        translate(this.x, this.y, this.size/2);
        box(this.size);
        pop();
    }
}