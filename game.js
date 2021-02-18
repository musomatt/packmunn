import { PackMunn } from './characters.js';
import { Point } from './point.js';
import {
  TILE_SIZE,
  CHARACTER_SIZE,
  Spawn,
  Directions,
  Tile,
  Grid,
} from './constants.js';

class Game {
  constructor() {
    this.dt = 0;
    this.last = -1;
    this.speed = 0.15;
    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
    this.munn = new PackMunn(Point.fromArray(Spawn.MUNN), Directions.NONE);
  }

  getSquareColour = (row, col) => {
    switch (Grid[row][col]) {
      case Tile.TERRAIN:
        return 'white';
      case Tile.PATH:
        return 'black';
      case Tile.PATH_VISITED:
        return 'blue';
      default:
        return 'white';
    }
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

    Grid[this.munn.position.y][this.munn.position.x] = Tile.PATH_VISITED;

    this.munn.needsUpdate = false;

    this.ctx.fillStyle = 'red';
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
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          this.munn.move(Directions.LEFT);
          break;
        case 'ArrowRight':
          this.munn.move(Directions.RIGHT);
          break;
        case 'ArrowDown':
          this.munn.move(Directions.DOWN);
          break;
        case 'ArrowUp':
          this.munn.move(Directions.UP);
          break;
        default:
          break;
      }
    });
  };

  moveCharacters = () => {
    switch (this.munn.direction) {
      case Directions.RIGHT:
        this.munn.move(Directions.RIGHT);
        break;
      case Directions.LEFT:
        this.munn.move(Directions.LEFT);
        break;
      case Directions.UP:
        this.munn.move(Directions.UP);
        break;
      case Directions.DOWN:
        this.munn.move(Directions.DOWN);
        break;
    }
  };

  update = () => {
    this.moveCharacters();
  };

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
