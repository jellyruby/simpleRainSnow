'use strict'
import Droplet from './droplet.js';
import Snowflake from './snowflake.js';
import weatherEvent from './weatherEvent.js';
import wind from './wind.js';


export default class weatherEffect {

  //최대 바람속도
  maxWind = {
    lowerWind: -20,
    upperWind: 20
  };                                     

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
    this.wind = 0;
    this.adjWind = 0;
    this.power = 1000;
    this.weatherID = 0;
    this.backgroundImage = 0;
    this.backgroundImageLoaded = 0;
    
    new weatherEvent(this);

    

    // 캔버스 크기를 설정한다.
    this.ResizeWindow();

    

    // 버튼 이벤트를 설정한다.
    const $toggleBtn = document.getElementById("toggle-weather");
    const $resetBtn = document.getElementById("reset");
    
    window.addEventListener('resize', () => this.ResizeWindow());
    $toggleBtn.addEventListener("click", () => this.toggleWeatherToken.next());
    $resetBtn.addEventListener("click", () => this.precipitation = []);
    
    
    
    this.setWeather();
    this.animate();
    this.loadBackgroundImage('public/images/blackcity.jpg');
    
    //이미 사용된 강수 가비지 컬렉팅
    setInterval(()=>{
      this.changePrecipitaionAll((precipitation,index) => { if(precipitation.deleted == true)  delete this.precipitation[index]; });
    },1000);
  }

  // 강수 애니메이션
  animate = () => {

    requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawBackgroundImage();

    this.checkOverMaxWind();

    this.changePrecipitaionAll((precipitation,index) => {
        
        if(!(precipitation instanceof this.preciptaionType)){
            this.precipitation[index] = new this.preciptaionType(precipitation.canvas, precipitation.ctx,this).setXY(precipitation.x,precipitation.y);
        }
        
        this.precipitation[index].update(this.wind+ this.adjWind);
        
        
    });

  };


  //전체 강수에 이벤트를 넣는다.
  changePrecipitaionAll = callBack => this.precipitation.forEach(callBack);

  //윈도우 크기가 바뀔때 재설정된다.
  ResizeWindow = () =>{
    this.canvas.width = window.innerWidth;
    this.canvas.height = document.getElementById('main').clientHeight; 
    
  }


  //강수 파워를 바꾼다.
  resetWeatherPower = (power) => {

    this.power=power;
    this.resetWeather();

  };

  //배경 이미지를 로딩한다.
  loadBackgroundImage = (imageUrl) => {
    this.backgroundImage = new Image();
    this.backgroundImage.src = imageUrl;
    this.backgroundImage.onload = () => this.backgroundImageLoaded = 1;
  }

  //배경 이미지를 그린다.
  drawBackgroundImage = () => {
    if (this.backgroundImageLoaded) this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
    
  }

  //최대 바람속도를 넘지 않게 한다.
  checkOverMaxWind() {
    this.wind += (Math.random()) - 0.5;
    if (this.wind > this.maxWind.upperWind) this.wind = this.maxWind.upperWind;
    if (this.wind < this.maxWind.lowerWind) this.wind = this.maxWind.lowerWind;
      
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
  

  // 강수생성기를 설정한다
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

  // 강수 생성기를 삭제한다.
  delWeather = () => {
    clearInterval(this.weatherID);
  }
  
  // 강수생성기를 재설정한다.
  resetWeather = () =>{

    this.delWeather();
    this.setWeather();

  }


}
