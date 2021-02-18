const TILE_SIZE = 24;
const CHARACTER_SIZE = 42;

const Spawn = {
  MUNN: [1, 1],
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
}

class Character {}

class PackMunn extends Character {}

class Game {
  constructor() {
    this.dt = 0;
    this.last = -1;
    this.speed = 0.4;
    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
  }

  getSquareColour = (row, col) => {
    return Grid[row][col] === 1 ? '#000000' : '#FFFFFF';
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

  update = () => {};

  render = () => {
    this.drawGrid();
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
  };
}

const game = new Game();
game.init();
