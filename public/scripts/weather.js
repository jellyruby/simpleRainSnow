'use strict'
import Droplet from './droplet.js';
import Snowflake from './snowflake.js';



export default class weatherEffect {

  maxwind = 20;
  preciptaionTypeDefinition = [Snowflake,Droplet];
  
  constructor() {

    this.canvas = document.getElementById("weather");
    this.ctx = this.canvas.getContext("2d");
    this.toggleWeatherToken = this.toggleWeather();
    this.preciptaionType = Droplet;
    this.precipitation = [];
    this.snowflakesOnGround = [];
    this.wind = 0;
    this.power = 50;
    this.weatherID = 0;
    this.backgroundImage = 0;
    this.backgroundImageLoaded = 0;
    
    //
    const weatherPowerDefinition = {
        strong: 10,
        normal: 50,
        weak:100
    }

    
    // Set canvas size to be the size of the window
    this.ResizeWindow();

    const toggleBtn = document.getElementById("toggle-weather");
    const rainShaftBtn = document.getElementById("rainShaft");
    const normalBtn = document.getElementById("normal");
    const resetBtn = document.getElementById("reset");



    // eventListener part start
    window.addEventListener('resize', () => this.ResizeWindow());
    toggleBtn.addEventListener("click", () => this.toggleWeatherToken.next());
    normalBtn.addEventListener("click", () => this.resetWeatherPower(weatherPowerDefinition.normal));
    rainShaftBtn.addEventListener("click", () => this.resetWeatherPower(weatherPowerDefinition.strong));
    resetBtn.addEventListener("click", () => this.precipitation = []);
    // eventListener part end
    
    this.setWeather();
    this.animate();

    this.backgroundImage = new Image();
    this.backgroundImage.src = 'public/images/blackcity.jpg';
    this.backgroundImage.onload = () => this.backgroundImageLoaded = 1;
    
      
  }



  // Create a loop to update the droplets/snowflakes
  animate = () => {
    requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

     if(this.backgroundImageLoaded == 1){
    
        this.ctx.drawImage(this.backgroundImage,0,0,this.canvas.width, this.canvas.height);
     }

    this.wind += (Math.random())-0.5;
    
    if(this.wind > 20) this.wind = 20;
    if(this.wind < -20) this.wind = -20;


    this.precipitation.forEach((precipitation,index) => {
        
        if(!(precipitation instanceof this.preciptaionType)){
            this.precipitation[index] = new this.preciptaionType(precipitation.canvas, precipitation.ctx,this).setXY(precipitation.x,precipitation.y);
            
        }
        this.precipitation[index].update(this.wind)
        
    });


    

    
    
  };

  ResizeWindow = () =>{
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  resetWeatherPower = (power) => {

    this.power=power;
    this.resetWeather();
  };


  *toggleWeather() {

    while(1){
        this.preciptaionType = Snowflake;
        yield ;
        this.preciptaionType = Droplet;
        yield ;
    }

  }
  

  // Create a loop to add new droplets/snowflakes
  setWeather = () => {

    this.weatherID = setInterval(() => {

    this.precipitation.push(new this.preciptaionType(this.canvas, this.ctx,this));

      // limit the number of droplets/snowflakes
      if (this.precipitation.length > 10000) {
        this.precipitation.shift();
      }

    }, this.power);

    return this;
  };

  delWeather = () => {
    clearInterval(this.weatherID);
  }
  
  resetWeather = () =>{

    this.delWeather();
    this.setWeather();

  }


}
