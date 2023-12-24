import { useState } from "react";

const ROWS = 30;
const COLS = 50;
const PIXELS = 10;

const moveRight = ([t, l]) => [t, l + 1];
const moveLeft = ([t, l]) => [t, l - 1];
const moveUp = ([t, l]) => [t - 1, l];
const moveDown = ([t, l]) => [t + 1, l];

//game state logic
const areOpposite = (dir1, dir2) => {
  if (dir1 == moveLeft && dir2 == moveRight) {
    return true;
  }
  if (dir1 === moveRight && dir2 === moveLeft) {
    return true;
  }
  if (dir1 === moveUp && dir2 === moveDown) {
    return true;
  }
  if (dir1 === moveDown && dir2 === moveUp) {
    return true;
  }
  return false;
};

const initialSnakePosition = () => {
  return [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ];
};

const checkValidHead = (keys, cell) => {
  let [top, left] = cell;
  if (top < 0 || left < 0) {
    return false;
  }
  if (top >= ROWS || left >= COLS) {
    return false;
  }
  if (keys.has(toKey(cell))) {
    return false;
  }
  return true;
};

function App() {
  const [pixels, setPixels] = useState(new Map());

  return <></>;
}

export default App;
