const TILE_SIZE = 24;
const CHARACTER_SIZE = 42;

const Spawn = {
  MUNN: [1, 1],
};

const Directions = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  NONE: "NONE",
};

const Grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static fromArray = (positionArray) => {
    return new Point(positionArray[0], positionArray[1]);
  };
  addX = (amount) => {
    this.x += amount;
    return this;
  };
  addY = (amount) => {
    this.y += amount;
    return this;
  };
  subX = (amount) => {
    this.x -= amount;
    return this;
  };
  subY = (amount) => {
    this.y -= amount;
    return this;
  };
}

class Character {
  constructor(position, direction) {
    this.position = position;
    this.direction = direction;
  }
  move = (direction) => {
    const newPosition = new Point(this.position.x, this.position.y);
    switch (direction) {
      case Directions.RIGHT:
        newPosition.addX(1);
        this.position = newPosition;
    }
  };
}

class PackMunn extends Character {
  constructor(position, direction) {
    super(position, direction);
  }
}

class Game {
  constructor() {
    this.dt = 0;
    this.last = -1;
    this.speed = 0.4;
    this.canvas = document.getElementById("game");
    this.ctx = this.canvas.getContext("2d");
    this.munn = new PackMunn(Point.fromArray(Spawn.MUNN), Directions.NONE);
  }

  getSquareColour = (row, col) => {
    return Grid[row][col] === 1 ? "#000000" : "#FFFFFF";
  };

  getSquarePosition = (row, col) => {
    const x = col * TILE_SIZE;
    const y = row * TILE_SIZE;
    return new Point(x, y);
  };

  drawGrid = () => {
    for (let row = 0; row < Grid.length; row++) {
      for (let col = 0; col < Grid[row].length; col++) {
        const colour = this.getSquareColour(row, col);
        const position = this.getSquarePosition(row, col);

        this.ctx.fillStyle = colour;
        this.ctx.fillRect(position.x, position.y, TILE_SIZE, TILE_SIZE);
      }
    }
  };

  drawCharacters = () => {
    const characterDrawPoint = this.findCharacterOffsetFromMidPoint(
      this.findMidPointTile(this.munn.position)
    );
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(
      characterDrawPoint.x,
      characterDrawPoint.y,
      CHARACTER_SIZE,
      CHARACTER_SIZE
    );
  };

  findMidPointTile = (position) => {
    const midPointX = position.x * TILE_SIZE + TILE_SIZE / 2;
    const midPointY = position.y * TILE_SIZE + TILE_SIZE / 2;
    return new Point(midPointX, midPointY);
  };

  findCharacterOffsetFromMidPoint = (tileMidPoint) => {
    const offset = CHARACTER_SIZE / 2;
    return new Point(tileMidPoint.x - offset, tileMidPoint.y - offset);
  };

  setUpEventHandler = () => {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowLeft":
          console.log("Left was pressed");
          break;
        case "ArrowRight":
          this.munn.move(Directions.RIGHT);
          break;
        case "ArrowDown":
          console.log("Down was pressed");
          break;
        case "ArrowUp":
          console.log("Up was pressed");
          break;
        default:
          console.log("invalid key");
          break;
      }
    });
  };

  update = () => {};

  render = () => {
    this.drawGrid();
    this.drawCharacters();
  };

  loop = () => {
    const now = Date.now();

    if (this.last < 0) {
      this.last = now;
    }

    this.dt = (now - this.last) / 1000;

    if (this.dt > this.speed) {
      this.last = now;
      this.dt = this.dt - this.speed;

      this.update();
      this.render();
    }

    requestAnimationFrame(this.loop);
  };

  init = () => {
    requestAnimationFrame(this.loop);
    this.setUpEventHandler();
  };
}

const game = new Game();
game.init();
