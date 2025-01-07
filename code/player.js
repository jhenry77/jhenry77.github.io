import { Vector } from './vector.js';

export class Player {
  constructor() {
    this.position = new Vector(100, 500);
    this.direction = new Vector(0, 0);
    this.width = 50;
    this.height = 50;
    this.speed = 200;
    this.frames = [];
    this.currentFrame = 0;
    this.frameDelay = 0.1;
    this.frameTimer = 0;
  }

  // loadFrames() {
  //   let frameCount = 4; // Replace with your frame count
  //   for (let i = 0; i < frameCount; i++) {
  //     let img = new Image();
  //     img.src = `player_frame_${i}.png`; // Replace with actual filenames
  //     this.frames.push(img);
  //   }
  // }

  getInput(keys) {
    if (keys.ArrowLeft) { 
      this.direction.x = -1;
    } else if (keys.ArrowRight) {
      this.direction.x = 1;
    } else {
      this.direction.x = 0;
    }

    if (keys.ArrowDown) { 
      this.direction.y = 1;
    } else if (keys.ArrowUp) { 
      this.direction.y = -1;
    } else {
      this.direction.y = 0;
    }
  }

  move(deltaTime){

    this.direction.normalize();
    // Horizontal Movement, Scales the direction by our variable speed and the amount of time that has passed, and then adds that to the player direction
    this.direction.x *= this.speed;
    this.direction.x *= deltaTime;
    this.position.x += this.direction.x;
    
    // Vertical movement, Scales the direction by our variable speed and the amount of time that has passed, and then adds that to the player direction
    this.direction.y *= this.speed;
    this.direction.y *= deltaTime;
    this.position.y += this.direction.y;
  }

  update(deltaTime){
    this.getInput(keys);
    this.move(deltaTime);
  }
}

// Track keyboard input
let keys = {};
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

// Example usage

