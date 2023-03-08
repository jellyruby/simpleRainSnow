'use strict'

export default class wind {

  constructor(weatherEffectObj) {
    this.weatherEffectObj = weatherEffectObj;
    this.wind = 0;
    this.adjWind = 0;
    this.maxWind = {
      lowerWind: -20,
      upperWind: 20
    };                                     
  }

  // 바람을 설정한다.
  setWind = (wind) => {
    this.wind = wind;
    this.checkOverMaxWind();
  }

  // 바람을 조절한다.
  setAdjWind = (adjWind) => {
    if(Math.abs(adjWind) > 30) return;
    this.adjWind = adjWind;
  }
  

  // 바람을 자연적으로 변화시킨다.
  windNaturalChange = () => {
    this.setWind(this.wind + ((Math.random()) - 0.5)/30 );
    requestAnimationFrame(this.windNaturalChange);
  }

  // 바람을 초기화한다.
  resetWind = () =>{
    this.wind = 0;
    this.adjWind = 0;
  }

  // 바람을 감소시킨다.
  graduallyDecreaseWind = () =>{
    if(Math.abs(this.wind) > 1){
        this.wind  = this.wind * 0.99;
        requestAnimationFrame(this.graduallyDecreaseWind);
    }
  }

  // 바람을 가져온다.
  getWind = () =>{
    return this.wind + this.adjWind;
  }

  //최대 바람속도를 넘지 않게 한다.
  checkOverMaxWind() {
    if (this.wind > this.maxWind.upperWind) this.wind = this.maxWind.upperWind;
    if (this.wind < this.maxWind.lowerWind) this.wind = this.maxWind.lowerWind;
  }

}