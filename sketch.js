let snake;
let food;
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes('antialias', true);
  angleMode(DEGREES);
  ortho();

  snake = new Snake(0, 0);
  food = new Food(random(-width*0.3, width*0.3), random(-height*0.3, height*0.3))
}

function draw() {
  background(150);
  angle = map(mouseY, 0, windowHeight, 0, 45)

  // Draw Pane
  push()
  fill(200)
  translate(0, -0, 0);
  rotateX(angle);
  plane(width*0.7, height*0.7);
  pop()
  
  snake.update();
  food.update();
  
  let hasEaten = snake.checkFood(food)
  if(hasEaten) {
    food = new Food(random(-width*0.3, width*0.3), random(-height*0.3, height*0.3))
  }
  
  rotateX(angle);
  snake.render();
  food.render();

  checkGameOver();
}

function keyPressed() {
  if(key === ' ') {
    snake.grow();
  }

  if(keyCode === LEFT_ARROW) {
    snake.moveLeft()
  } else if(keyCode === RIGHT_ARROW) {
    snake.moveRight()
  } else if(keyCode === UP_ARROW) {
    snake.moveUp()
  } else if(keyCode === DOWN_ARROW) {
    snake.moveDown()
  }
}

function checkGameOver() {
  if(snake.getHead().x <= -width*0.35 || snake.getHead().y < -height*0.35
      || snake.getHead().x > width*0.35 || snake.getHead().y > height*0.35) {
    noLoop();
  }
}
