// drawSnake([
//   //coords
//   [0, 0],
//   [0, 1],
//   [0, 2],
//   [0, 3],
//   [0, 4],
// ]);

let canvas = document.getElementById("canvas");

// function drawSnake() {
//   // use a grid and toggle the backeground color
// }

const ROWS = 40;
const COLS = 50;
const PIXEL = 10;

let pixels = new Map();

function initializeCanvas() {
  //create a grid
  //made the pixels relative.
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let pixel = document.createElement("div");
      pixel.style.position = "absolute";
      pixel.style.border = "1px solid #aaa";
      pixel.style.left = j * PIXEL + "px";
      pixel.style.top = i * PIXEL + "px";
      pixel.style.width = PIXEL + "px";
      pixel.style.height = PIXEL + "px";
      //position of the snake
      let position = i + "_" + j;
      canvas.appendChild(pixel);
      pixels.set(position, pixel);
    }
  }
}

initializeCanvas();

function drawSnake(snake) {
  //preprocess the snake positions
  let snakePositions = new Set();
  for (let [x, y] of snake) {
    let position = x + "_" + y;
    snakePositions.add(position);
  }

  //go over all the rows and the cols
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      //get the correspondent pixel.
      let position = i + "_" + j;
      //grab the corresponding pixel.
      let pixel = pixels.get(position);
      pixel.style.background = snakePositions.has(position) ? "black" : "white";
    }
  }
}

let currentSnakeState = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
];



function moveRight([top, left]) {
  return [top, left + 1];
}

function moveLeft([top, left]) {
  return [top, left - 1];
}

function moveUp([top, left]) {
  return [top - 1, left];
}

function moveDown([top, left]) {
  return [top + 1, left];
}

let currentDirection = moveRight;

function step() {
  currentSnakeState.shift();
  let head = currentSnakeState[currentSnakeState.length - 1];
  //currentSnakeState.push([head[0], head[1] + 1]);
  let nextHead = currentDirection(head);
  currentSnakeState.push(nextHead);
  drawSnake(currentSnakeState);
}

drawSnake(currentSnakeState);
setInterval(() => {
  step();
}, 1000);
