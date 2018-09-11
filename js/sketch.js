let snake;
let food;
let blockSize;
let planeSize; 
let isometric = false;
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  
  blockSize = windowWidth * 0.04;
  planeSize = {
    width: windowWidth,
    height: windowHeight
  };
  
  snake = new Snake(windowWidth/2, windowHeight/2, blockSize);
  food = createFood();

  setAttributes('antialias', true);
}

function draw() {
  background(184, 184, 184);
  translate(-windowWidth/2, -windowHeight/2, 0);
  
  let angle = map(mouseY, 0, height, 0, max(windowWidth, windowHeight)*0.7);
  camera(
    0, 
    angle,
    min(windowWidth, windowHeight)*0.8, 
    0, 0, 0, 0, 1, 0);
  
  pointLight(250, 250, 250, 0, 1000, 0);

  // Draw Pane
  push()
  fill(200)
  translate(windowWidth/2, windowHeight/2, 0);
  plane(planeSize.width, planeSize.height);
  pop()
  
  snake.update();
  food.update();
  
  if(snake.isEating(food)) {
    snake.grow();
    food = createFood();
  }
  
  snake.render();
  food.render();

  checkGameOver();
}

function keyPressed() {
  if(key === ' ') {
    // snake.grow();
    isometric = !isometric; 
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

function createFood() {  
  let newFood = new Food(
    random(planeSize.width*0.2, planeSize.width*0.8), 
    random(planeSize.height*0.2, planeSize.height*0.8), 
    blockSize);

  // Snap to grid
  newFood.x = round(newFood.x / (blockSize+snake.spacing)) * (blockSize+snake.spacing);
  newFood.y = round(newFood.y / (blockSize+snake.spacing)) * (blockSize+snake.spacing);

  if(snake.isInBody(newFood.x, newFood.y, newFood.size))
    return createFood();
  else
    return newFood;
}

function checkGameOver() {
  let head = snake.getHead();

  if(head.x <= 0+blockSize || head.x >= planeSize.width - blockSize 
      || head.y <= 0+blockSize || head.y >= planeSize.height - blockSize/2
      || snake.isInBody(head.x, head.y, snake.size)) {
    print("Game over");
    noLoop();
  }
}
