import { Grid, Directions, Tile } from './constants.js';
import { Point } from './point.js';

export class Character {
  constructor(position, direction) {
    this.position = position;
    this.direction = direction;
    this.needsUpdate = false;
  }

  canMoveToPosition = (newPosition) => {
    return Grid[newPosition.y][newPosition.x] !== Tile.TERRAIN;
  };

  move = (direction) => {
    if (this.needsUpdate === false) {
      const newPosition = new Point(this.position.x, this.position.y);

      switch (direction) {
        case Directions.RIGHT:
          newPosition.addX(1);
          break;
        case Directions.LEFT:
          newPosition.subX(1);
          break;
        case Directions.UP:
          newPosition.subY(1);
          break;
        case Directions.DOWN:
          newPosition.addY(1);
          break;
      }

      if (this.canMoveToPosition(newPosition)) {
        this.position = newPosition;
        this.direction = direction;
        this.needsUpdate = true;
      }
    }
  };
}

export class PackMunn extends Character {
  constructor(position, direction) {
    super(position, direction);
  }
}
