export class Vector {
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }
  
    add(v) {
      this.x += v.x;
      this.y += v.y;
    }
  
    scale(scalar) {
      this.x *= scalar;
      this.y *= scalar;
    }
  
    normalize() {
      let length = Math.sqrt(this.x * this.x + this.y * this.y);
      if (length > 0) {
        this.x /= length;
        this.y /= length;
      }
    }
  }
  