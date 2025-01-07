import { Vector } from './vector.js';
import {Player} from './player.js';

// Setup canvas

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 600;


let lastTime = performance.now();
const player = new Player();




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
//Listens for specific user input
// function getInput(){
//     if (keys.ArrowLeft){ 
//         player.direction.x = -1
//     }else if (keys.ArrowRight){
//         player.direction.x = 1
//     }else{
//         player.direction.x = 0;
//     }

//     if(keys.ArrowDown){ 
//         player.direction.y = 1
//     }else if(keys.ArrowUp){ 
//         player.direction.y = -1
//     }else{
//         player.direction.y = 0;
//     }


// }
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
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.position.x, player.position.y, player.width, player.height);
}



// Start the game loop
requestAnimationFrame(gameLoop)