import { Vector } from './vector.js';
import { player, loadFrames } from './player.js';
import { keys, setupInput } from './input.js';

// Setup canvas
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 600;

let isRunning = true;
let lastTime = performance.now();

function gameLoop(timestamp) {
  if (!isRunning) return;

  let deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  update(deltaTime);
  draw();

  requestAnimationFrame(gameLoop);
}

function update(deltaTime) {
  let direction = new Vector(0, 0);

  if (keys.ArrowLeft) direction.x -= 1;
  if (keys.ArrowRight) direction.x += 1;

  direction.normalize();
  player.velocity = new Vector(direction.x, direction.y);
  player.velocity.scale(player.speed * deltaTime);
  player.position.add(player.velocity);

  player.position.x = Math.max(0, Math.min(canvas.width - player.width, player.position.x));
  player.position.y = Math.max(0, Math.min(canvas.height - player.height, player.position.y));

  player.frameTimer += deltaTime;
  if (player.frameTimer >= player.frameDelay) {
    player.frameTimer = 0;
    player.currentFrame = (player.currentFrame + 1) % player.frames.length;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    player.frames[player.currentFrame], 
    player.position.x, 
    player.position.y, 
    player.width, 
    player.height
  );
}

// Initialization
setupInput();
loadFrames();
requestAnimationFrame(gameLoop);
