'use strict'
import Droplet from './droplet.js';
import Snowflake from './snowflake.js';
import weatherEvent from './weatherEvent.js';
import wind from './wind.js';


export default class weather {

  //날씨 강도를 설정한다.
  weatherPowerDefinition = {
    strong: 30,
    normal: 100,
    weak: 1000
  }
  preciptaionTypeDefinition = [Snowflake,Droplet];
  
  constructor() {

    this.canvas = document.getElementById("weather");
    this.ctx = this.canvas.getContext("2d");
    this.toggleWeatherToken = this.toggleWeather();
    this.preciptaionType = Droplet;
    this.precipitation = [];
    this.snowflakesOnGround = [];
    this.wind = new wind(this);
    
    this.power = 1000;
    this.weatherID = 0;
    this.backgroundImage = 0;
    this.backgroundImageLoaded = false;
    
    new weatherEvent(this);
    
    this.ResizeWindow();      // 캔버스 크기를 설정한다.

    const $toggleBtn = document.getElementById("toggle-weather");
    const $resetBtn = document.getElementById("reset");
    
    window.addEventListener('resize', () => this.ResizeWindow());
    $toggleBtn.addEventListener("click", () => this.toggleWeatherToken.next());
    $resetBtn.addEventListener("click", () => this.precipitation = []);
    
    this.startWeather();
    this.animate();
    this.garbageCollectionPrecipitation();
    
  }

  //이미 사용된 강수 가비지 컬렉팅
  garbageCollectionPrecipitation = () => {
    setInterval(()=> this.changePrecipitationAll( (precipitation,index) => { if(precipitation.deleted == true)  delete this.precipitation[index]; }),1000);
  }


  //cavnas 애니메이션을 그린다.
  animate = () => {

    requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawBackgroundImage();

    this.wind.windNaturalChange();

    this.changePrecipitationAll((precipitation,index) => {
        
        if(!(precipitation instanceof this.preciptaionType)){
            this.precipitation[index] = new this.preciptaionType(precipitation.canvas, precipitation.ctx,this).setXY(precipitation.x,precipitation.y);
        }
        
        this.precipitation[index].update(this.wind.getWind());
        
        
    });

  };


  //전체 강수를 변경한다.
  changePrecipitationAll = callBack => this.precipitation.forEach(callBack);

  //윈도우 크기가 바뀔때 재설정된다.
  ResizeWindow = () =>{
    this.canvas.width = window.innerWidth;
    this.canvas.height = document.getElementById('main').clientHeight; 
  }

  //강수 파워를 바꾼다.
  resetWeatherPower = (power) => {

    this.power=power;
    this.restartWeather();

  };

  //배경 이미지를 로딩한다.
  loadBackgroundImage = (imageUrl) => {
    this.backgroundImage = new Image();
    this.backgroundImage.src = imageUrl;
    this.backgroundImage.onload = () => this.backgroundImageLoaded = true;
  }

  //배경 이미지를 그린다.
  drawBackgroundImage = () => {
    if (this.backgroundImageLoaded) this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
    
  }

  //날씨를 변경하는 Generator. 
  *toggleWeather() {

    while(1){
        document.getElementById("toggle-weather").innerText = 'CHANGE RAIN';
        this.preciptaionType = Snowflake;
        yield ;
        document.getElementById("toggle-weather").innerText = 'CHANGE SNOW';
        this.preciptaionType = Droplet;
        yield ;
    }

  }
  

  //날씨를 시작한다.
  startWeather = () => {

    this.weatherID = setInterval(() => {

    this.precipitation.push(new this.preciptaionType(this.canvas, this.ctx,this));

      // limit the number of droplets/snowflakes
      if (this.precipitation.length > 10000) {
        this.precipitation.shift();
      }

    }, this.power);

    return this;
  };

  //날씨를 멈춘다.
  stopWeather = () => {
    clearInterval(this.weatherID);
    return this;
  }
  
  //날씨를 재시작한다.
  restartWeather = () => this.stopWeather().startWeather();

}
