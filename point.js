export class Point {
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

  lerp = (v, t) => {
    this.x = this.x + (v.x - this.x) * t;
    this.y = this.y + (v.y - this.y) * t;
    return this;
  };
}
