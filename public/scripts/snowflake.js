"use strict";
import precipitation from './precipitation.js';
import droplet from './droplet.js';

// 눈 1개에 대한 클래스
export default class Snowflake extends precipitation {
    constructor(canvas,ctx,weatherEffectObj) {
      super(canvas,ctx,weatherEffectObj);
      this.size = Math.random() * 3 + 1;
      this.speed = Math.random() + 0.5;
      this.weight = Math.random()*0.1 + 0.5;
      
    }
  
    //바닥에 떨어졌을때 체크하는 메소드
    groundfall(canvas){
  
      this.y = canvas.height;
      this.collided = true;
      this.weatherEffectObj.snowflakesOnGround.push(this);
      this.checkCollision(this,this.weatherEffectObj);
  
    }
  
  
    //눈을 그리는 메소드
    draw() {
  
      const ctx = this.ctx;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
    }


  
  }
  