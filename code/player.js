import { Vector } from './vector.js';

export const player = {
  position: new Vector(100, 500),
  velocity: new Vector(0, 0),
  width: 50,
  height: 50,
  speed: 200,
  frames: [],
  currentFrame: 0,
  frameDelay: 0.1,
  frameTimer: 0,
};

export function loadFrames() {
  let frameCount = 4; // Replace with your frame count
  for (let i = 0; i < frameCount; i++) {
    let img = new Image();
    img.src = `player_frame_${i}.png`; // Replace with actual filenames
    player.frames.push(img);
  }
}