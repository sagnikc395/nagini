import { useState } from "react";

const ROWS = 30;
const COLS = 50;
const PIXEL = 10;

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
  const [currentFoodKey, setCurrentFoodKey] = useState("");
  const [currentDirection, setCurrentDirection] = useState(() => moveRight);
  const [directionQueue, setDirectionQueue] = useState([]);
  const [gameInterval, setGameInterval] = useState(null);
  const [currentSnake, setCurrentSnake] = useState(initialSnakePosition());
  const [currentSnakeKeys, setCurrentSnakeKeys] = useState(new Set());
  const [currentVacantKeys, setCurrentVacantKeys] = useState(new Set());

  const initializeCanvas = () => {
    //load the canvas component
    const pixelsMap = new Map();
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        const key = toKey([i, j]);
        pixelsMap.set(key, {
          top: i * PIXEL,
          left: j * PIXEL,
          background: "white",
        });
      }
    }
    setPixels(pixelsMap);
  };

  return (
    <div>
      <div
        id="canvas"
        style={{
          position: "relative",
          width: `${COLS * PIXEL}px`,
          height: `${ROWS * PIXEL}px`,
        }}
      >
        {Array.from(pixels.values()).map(({ top, left, background }, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              border: "1px solid #aaa",
              top: `${top}px`,
              left: `${left}px`,
              width: `${PIXEL}px`,
              height: `${PIXEL}px`,
              background,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
