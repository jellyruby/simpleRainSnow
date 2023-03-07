"use strict";

// 하늘에서 떨어지는 강수에 대한 정의
export default class precipitation {


    constructor(canvas,ctx,weatherEffectObj) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height/8;
      
      this.speed = Math.random() + 1;
      this.weight = Math.random()*0.5 + 0.1;
  
      this.canvas = canvas;
      this.ctx = ctx;
      this.collided = false;
      this.weatherEffectObj = weatherEffectObj;
    }
    
      _deleted;
    get deleted() {
      return this._deleted;
    }
    set deleted(value) {
      if(value !== true) return;
      this._deleted = value;
    }

    setXY = (x,y)=> {

        this.oldx = x;
        this.oldy = y;
        this.x = x;
        this.y = y;
        return this;
    }
  
    
    checkCollision = (snowflake) =>{
  
      const snowflakes = this.weatherEffectObj.snowflakesOnGround;
      for (let i = 0; i < snowflakes.length; i++) {
        // check if the current snowflake is the same as the one passed in
        if (snowflakes[i] === snowflake) {
          continue;
        }
        // check if the current snowflake is in the same x position as the one passed in
        var distance = Math.sqrt(Math.pow(snowflake.x - (snowflakes[i].x), 2) + Math.pow(snowflake.y - snowflakes[i].y, 2));
        if (distance < snowflake.size + (snowflakes[i].size) ) {
          snowflake.y = snowflakes[i].y - ((snowflake.size + snowflakes[i].size)/8);
        }
  
        if(this.weatherEffectObj.snowflakeTop > snowflake.y ){
          this.weatherEffectObj.snowflakeTop = snowflake.y;
        }
  
      }
  
    }
  
    MoveWindEffect = (wind) =>{
      const canvas  = this.canvas;
      this.x += (wind * this.weight);
      if (this.x > canvas.width ) {
        this.oldx = 0;
        this.x = 0;
      }
  
      if (this.x < 0 ) {
        this.oldx = canvas.width;
        this.x = canvas.width;
      
    }
  
    }
  


    update = (wind) => {
  
      if(this.deleted == true) return;

      if(!this.collided){
  
        const canvas  = this.canvas;
        this.y += this.speed;
  
        if (this.y > canvas.height ) {
          this.groundfall(canvas);
          this.weight = 0.001;  //바람의 영향을 거의 안받도록 조정
        }
  
      }
  
      this.MoveWindEffect(wind);
      this.draw();

    }
  

  }