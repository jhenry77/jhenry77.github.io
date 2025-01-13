import { Vector } from './vector.js';
import {preloadImages} from './helpful.js'
import { Timer } from './timer.js';

export class Player {
  constructor() {
    // Player Postion/Movement
    this.position = new Vector(100, 500);
    this.direction = new Vector(0, 0);
    this.width = 50;
    this.height = 50;
    this.speed = 200;
    // Player Animations
    this.frameIndex = 0;
    this.animations ={};
    this.animationsLength = {}
    this.status = "down_idle"
    this.image = new Image();
    this.image.src = "../graphics/character/down_idle/0.png"
    // Player tools
    this.tools = ['hoe','axe','water']
    this.toolNum = 0
    this.selectedTool = this.tools[this.toolNum]
    this.timers = {'tool_use': new Timer(350,() => this.use_tool()),
                    'tool_switch': new Timer(350),
                  'seed_use': new Timer(350, () => this.use_seed())
    }
    // Player seeds
    this.seeds = ['corn','tomato']
    this.seedNum = 0
    this.selectedSeed = this.seeds[this.seedNum]
  }
  //Is called when a tool is used.
  use_tool(){
    console.log(this.selectedTool);
  }

  use_seed(){
    console.log(this.selectedSeed);
  }

  //Helpful funciton to preload assets
  import_assets(){
      this.animations =  {
        'up': ["../graphics/character/up/"],
        'down': [ "../graphics/character/down/"],
        'left': [ "../graphics/character/left/"],
        'right': [ "../graphics/character/right/"],
				'right_idle':[ "../graphics/character/right_idle/"],
        'left_idle':[ "../graphics/character/left_idle/"],
        'up_idle':[ "../graphics/character/up_idle/"],
        'down_idle':[ "../graphics/character/down_idle/"],
				'right_hoe':[ "../graphics/character/right_hoe/"],
        'left_hoe':[ "../graphics/character/left_hoe/"],
        'up_hoe':[ "../graphics/character/up_hoe/"],
        'down_hoe':[ "../graphics/character/down_hoe/"],
				'right_axe':[ "../graphics/character/right_axe/"],
        'left_axe':[ "../graphics/character/left_axe/"],
        'up_axe':[ "../graphics/character/up_axe/"],
        'down_axe':[ "../graphics/character/down_axe/"],
				'right_water':[ "../graphics/character/right_water/"],
        'left_water':[ "../graphics/character/left_water/"],
        'up_water':[ "../graphics/character/up_water/"],
        'down_water':[ "../graphics/character/down_water/"]}
        this.animationsLength =  {
          'up': 4 ,
          'down': 4 ,
          'left': 4 ,
          'right': 4,
          'right_idle': 2,
          'left_idle': 2,
          'up_idle': 2,
          'down_idle':2,
          'right_hoe':2,
          'left_hoe':2,
          'up_hoe':2,
          'down_hoe':2,
          'right_axe':2,
          'left_axe':2,
          'up_axe':2,
          'down_axe':2,
          'right_water':2,
          'left_water':2,
          'up_water':2,
          'down_water':2}
        
      let urls = [];
      for(let anim in this.animations){
        let basePath = this.animations[anim]
        let numFrames = this.animationsLength[anim]

        for(let i = 0; i < numFrames; i++){
          let imagePath = basePath + i + ".png";
          urls.push(imagePath);
        }
      }
      preloadImages(urls);

  }

  //Controls all animations, by setting image source from status and using delta time to determine the animation frame
  animate(deltaTime){
    this.frameIndex += 4 * deltaTime;
    if(this.frameIndex >= (this.animationsLength[this.status])){
      this.frameIndex = 0;
    }
    this.image.src = this.animations[this.status] + Math.floor(this.frameIndex) + ".png"
    
    // this.image.src = this.animations[this.status] + this.frameIndex + ".png"
  }

  //Gets input from user and uses this information to set direction as well as status
  getInput(keys) {
    // Makes sure the user cannot do anything while using the tool
    if(!this.timers['tool_use'].active && !this.timers['seed_use'].active){
      
      //Tool Input/Use
      if(keys[' ']){
        this.timers['tool_use'].activate();
        this.direction.x, this.direction.y = 0,0;
        this.frameIndex = 0;
      }

      if(keys['e']){
        this.timers['seed_use'].activate();
        this.direction.x, this.direction.y = 0,0;
      }

      // Changing tools
      //Hoe tool case
      if(keys['1'] && !this.timers['tool_switch'].active){
        this.timers['tool_switch'].activate();
        this.toolNum = 0;
        this.selectedTool = this.tools[this.toolNum]
      }
      //Axe tool case
      if(keys['2'] && !this.timers['tool_switch'].active){
        this.timers['tool_switch'].activate();
        this.toolNum = 1;
        this.selectedTool = this.tools[this.toolNum]
      }
      // Watering can Tool case
      if(keys['3'] && !this.timers['tool_switch'].active){
        this.timers['tool_switch'].activate();
        this.toolNum = 2;
        this.selectedTool = this.tools[this.toolNum]
      }

      // Seed inputs
      if(keys['4']){
        this.seedNum = 0;
        this.selectedSeed = this.seeds[this.seedNum]
      }
      //Axe tool case
      if(keys['5'] && !this.timers['tool_switch'].active){
        this.seedNum = 1;
        this.selectedSeed = this.seeds[this.seedNum]
      }
    
      //Direction Movements

      //Left Movement
      if (keys['a']) { 
        this.direction.x = -1;
        this.status = 'left';

      // Moving Right
      } else if (keys['d']) {
        this.direction.x = 1;
        this.status = 'right';

      } else {
        this.direction.x = 0;
      }

      // Moving Down
      if (keys['s']) { 
        this.direction.y = 1;
        this.status = 'down';

      // Moving Up
      } else if (keys['w']) { 
        this.direction.y = -1;
        this.status = 'up';
        
      } else {
        this.direction.y = 0;
      }
    }else{
      this.direction.x = 0;
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
  updateTimers(){
    for (let timer of Object.values(this.timers)) { // Iterates over actual objects
      timer.update(); // Works because 'timer' is now an object
  }
  }
  //This funciton is called every frame
  update(deltaTime){


    this.getInput(keys);
    this.updateTimers();
    this.getStatus();
   


    this.move(deltaTime);
    this.animate(deltaTime);
   
  }

  getStatus(){
    // Making it so if the player isnt moving then they will play their idle
    if (this.direction.magnitude() == 0){
        this.status = this.status.split('_')[0] + '_idle'
    }

    if (this.timers['tool_use'].active)
       this.status = this.status.split('_')[0] + "_" + this.selectedTool;
  }
}

// Track keyboard input
let keys = {};
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

// Example usage

