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

//TODO: memoize the position
function getSnakePositionSet(snake) {
  let snakePosition = new Set();
  for (let [top, left] of snake) {
    let posn = top + "_" + left;
    snakePosition.add(posn);
  }
  return snakePosition;
}

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
  [0, 4],
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
let flushedDirection = currentDirection;
//adding keystroke input

let directionQueue = [];

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
    case "A":
    case "a":
      // if (flushedDirection !== moveRight) {
      //   currentDirection = moveLeft;
      // }
      // break;
      directionQueue.push(moveLeft);
      break;

    case "ArrowRight":
    case "D":
    case "d":
      // if (flushedDirection !== moveLeft) {
      //   currentDirection = moveRight;
      // }
      // break;
      directionQueue.push(moveRight);
      break;
    case "ArrowUp":
    case "w":
    case "W":
      // if (flushedDirection !== moveDown) {
      //   currentDirection = moveUp;
      // }
      // break;
      directionQueue.push(moveUp);
      break;
    case "ArrowDown":
    case "s":
    case "S":
      // if (flushedDirection !== moveUp) {
      //   currentDirection = moveDown;
      // }
      // break;
      directionQueue.push(moveDown);
      break;
  }
  //dump(directionQueue);
});

function areOpposite(dir1, dir2) {
  if (dir1 === moveLeft && dir2 === moveRight) {
    return true;
  } else if (dir1 === moveRight && dir2 == moveLeft) {
    return true;
  } else if (dir1 == moveUp && dir2 == moveDown) {
    return true;
  } else if (dir1 == moveDown && dir2 === moveUp) {
    return true;
  }
  return false;
}

function step() {
  currentSnakeState.shift();
  let head = currentSnakeState[currentSnakeState.length - 1];
  //update the current direction
  let nextDirection = currentDirection;
  while (directionQueue.length > 0) {
    let candidateDirection = directionQueue.shift();
    //check if in opposite direction or not
    if (areOpposite(candidateDirection, currentDirection)) {
      continue;
    }
    nextDirection = candidateDirection;
    break;
  }
  currentDirection = nextDirection;
  let nextHead = currentDirection(head);
  // currentSnakeState.push(nextHead);
  if (!checkValidHead(currentSnakeState, nextHead)) {
    stopGame();
    return;
  }
  currentSnakeState.push(nextHead);
  drawSnake(currentSnakeState);
}
function checkValidHead(snake, [top, left]) {
  if (top < 0 || left < 0) {
    return false;
  }
  if (top >= ROWS || left >= COLS) {
    return false;
  }
  //return true;
  let snakePositions = getSnakePositionSet(snake);
  let position = top + "_" + left;
  if (snakePositions.has(position)) {
    return false;
  }
  return true;
}

function stopGame() {
  canvas.style.borderColor = "red";
  //once hit the board edges then stop
  clearInterval(gameInterval);
}

drawSnake(currentSnakeState);
let gameInterval = setInterval(() => {
  step();
}, 80);

function dump(obj) {
  document.getElementById("debug").innerText = JSON.stringify(obj);
}
