import { Grid, Directions, Tile, CHARACTER_SIZE } from './constants.js';
import { Point } from './point.js';

export class Character {
  constructor(position, direction) {
    this.image;
    this.position = position;
    this.direction = direction;
    this.needsUpdate = false;
  }

  getImage = () => {
    return this.image;
  };

  canMoveToPosition = (newPosition) => {
    return Grid[newPosition.y][newPosition.x] !== Tile.TERRAIN;
  };

  workOutNewPosition = (direction) => {
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

    return newPosition;
  };
}

export class PackMunn extends Character {
  constructor(position, direction) {
    super(position, direction);
    this.isMunnbreakable = false;
    this.image = new Image(CHARACTER_SIZE, CHARACTER_SIZE);
    this.image.src = 'munn-normal.png';
    this.imageNormal = 'munn-normal.png';
    this.imageFrenzy = 'munn-frenzy.png';
  }

  move = (direction) => {
    if (this.needsUpdate === false) {
      const newPosition = this.workOutNewPosition(direction);
      if (this.canMoveToPosition(newPosition)) {
        this.position = newPosition;
        this.direction = direction;
        this.needsUpdate = true;
      }
    }
  };

  switchImage = (image) => {
    this.image.src = image;
  };
}

export class Ghost extends Character {
  constructor(position, direction) {
    super(position, direction);
    this.directionsList = Object.values(Directions).slice(0, 4);
  }

  move = (direction) => {
    if (this.needsUpdate === false) {
      const possibleDirections = this.getPossibleDirections(
        this.position,
        direction
      );
      const randomDirection = this.randomDirection(possibleDirections);
      const newPosition = this.workOutNewPosition(randomDirection);
      this.position = newPosition;
      this.direction = randomDirection;
      this.needsUpdate = true;
    }
  };

  getPossibleDirections = (currentPosition, currentDirection) => {
    const backwardsDirection = this.backwardsDirection(currentDirection);
    const possibleDirections = [];
    const canMoveUp = Grid[currentPosition.y - 1][currentPosition.x] !== 0;
    const canMoveDown = Grid[currentPosition.y + 1][currentPosition.x] !== 0;
    const canMoveRight = Grid[currentPosition.y][currentPosition.x + 1] !== 0;
    const canMoveLeft = Grid[currentPosition.y][currentPosition.x - 1] !== 0;

    if (backwardsDirection !== Directions.LEFT && canMoveLeft) {
      possibleDirections.push(Directions.LEFT);
    }
    if (backwardsDirection !== Directions.RIGHT && canMoveRight) {
      possibleDirections.push(Directions.RIGHT);
    }
    if (backwardsDirection !== Directions.UP && canMoveUp) {
      possibleDirections.push(Directions.UP);
    }
    if (backwardsDirection !== Directions.DOWN && canMoveDown) {
      possibleDirections.push(Directions.DOWN);
    }
    return possibleDirections;
  };
  randomDirection = (directionsList) => {
    return directionsList[Math.floor(Math.random() * directionsList.length)];
  };
  backwardsDirection = (direction) => {
    const currentDirectionIndex = this.directionsList.indexOf(direction);
    const oppositeDirectionIndex =
      (currentDirectionIndex + this.directionsList.length + 2) %
      this.directionsList.length;
    return this.directionsList[oppositeDirectionIndex];
  };
}
