import { Vector } from './vector.js';
import {Player} from './player.js';
import {preloadImages} from './helpful.js'



// Setup canvas

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 600;


let lastTime = performance.now();
const player = new Player();
player.import_assets();




let isRunning = true;
// Game loop
function gameLoop(timestamp) {
  if (!isRunning){
    return
  }; // Exit the loop if the game stops

  // Update game state
  let deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;
  update(deltaTime);
  
  // Render the game
  draw();

  // Loop
   requestAnimationFrame(gameLoop);
}

// Update game state such as player position
function update(deltaTime) {
  //Gets user input
  player.update(deltaTime);

}

// Draw the game
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  // ctx.fillStyle = 'blue';
  // ctx.fillRect(player.position.x, player.position.y, player.width, player.height);a

  ctx.drawImage(player.image, player.position.x, player.position.y);
}



// Start the game loop
requestAnimationFrame(gameLoop)