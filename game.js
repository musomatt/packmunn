import { Ghost, PackMunn } from './characters.js';
import { Point } from './point.js';
import {
  TILE_SIZE,
  CHARACTER_SIZE,
  Spawn,
  Directions,
  Tile,
  Grid,
  Scores,
} from './constants.js';
import { Audio } from './audio.js';

class Game {
  constructor() {
    this.dt = 0;
    this.last = -1;
    this.speed = 0.15;
    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
    this.munn = new PackMunn(
      Point.fromArray(Spawn.MUNN.POSITION),
      Spawn.MUNN.DIRECTION
    );
    this.ghost = new Ghost(
      Point.fromArray(Spawn.GHOSTS[0].POSITION),
      Spawn.GHOSTS[0].DIRECTION
    );
    this.score = 0;
    this.scoreElement = document.getElementsByClassName('score')[0];
    this.bugImage = new Image(CHARACTER_SIZE, CHARACTER_SIZE);
    this.bugImage.src = 'bug.png';
    this.audio = new Audio();
  }

  getSquareColour = (row, col) => {
    switch (Grid[row][col]) {
      case Tile.TERRAIN:
        return 'white';
      case Tile.PATH:
      case Tile.PATH_VISITED:
      case Tile.BUG:
        return 'black';
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

        if (Grid[row][col] === Tile.BUG) {
          this.ctx.drawImage(
            this.bugImage,
            position.x,
            position.y,
            TILE_SIZE,
            TILE_SIZE
          );
        }
      }
    }
  };

  drawCharacters = () => {
    Grid[this.munn.position.y][this.munn.position.x] = Tile.PATH_VISITED;

    this.munn.needsUpdate = false;
    this.ghost.needsUpdate = false;

    // munn
    const munnDrawPoint = this.findCharacterOffsetFromMidPoint(
      this.findMidPointTile(this.munn.position)
    );

    this.ctx.drawImage(
      this.munn.getImage(),
      munnDrawPoint.x,
      munnDrawPoint.y,
      CHARACTER_SIZE,
      CHARACTER_SIZE
    );

    // ghost
    const ghostMidPoint = this.findCharacterOffsetFromMidPoint(
      this.findMidPointTile(this.ghost.position)
    );
    this.ctx.fillStyle = 'pink';
    this.ctx.fillRect(
      ghostMidPoint.x,
      ghostMidPoint.y,
      CHARACTER_SIZE,
      CHARACTER_SIZE
    );
  };

  drawScore = () => {
    if (Number(this.scoreElement.innerHTML) !== this.score) {
      this.scoreElement.innerHTML = this.score;
    }
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

      this.audio.startBackgroundMusic();
    });
  };

  updateScore = () => {
    const tile = Grid[this.munn.position.y][this.munn.position.x];

    switch (tile) {
      case Tile.PATH:
        this.score += Scores.DOT;
        break;
      case Tile.BUG:
        this.score += Scores.BUG;
        break;
    }
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

    this.updateScore();
    switch (this.ghost.direction) {
      case Directions.RIGHT:
        this.ghost.move(Directions.RIGHT);
        break;
      case Directions.LEFT:
        this.ghost.move(Directions.LEFT);
        break;
      case Directions.UP:
        this.ghost.move(Directions.UP);
        break;
      case Directions.DOWN:
        this.ghost.move(Directions.DOWN);
        break;
    }
  };

  update = () => {
    this.moveCharacters();
  };

  render = () => {
    this.drawGrid();
    this.drawCharacters();
    this.drawScore();
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
