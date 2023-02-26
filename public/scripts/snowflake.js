"use strict";
import precipitation from './precipitation.js';
import droplet from './droplet.js';

// Create a Snowflake class
export default class Snowflake extends precipitation {
    constructor(canvas,ctx,weatherEffectObj) {
      super(canvas,ctx,weatherEffectObj);
      this.size = Math.random() * 3 + 1;
      this.speed = Math.random() + 0.5;
      this.weight = Math.random()*0.1 + 0.5;
      
    }
  
    groundfall(canvas){
  
      this.y = canvas.height;
      this.collided = true;
      this.weatherEffectObj.snowflakesOnGround.push(this);
      this.checkCollision(this,this.weatherEffectObj);
  
    }
  
  
  
    draw() {
  
      const ctx = this.ctx;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
    }


  
  }
  