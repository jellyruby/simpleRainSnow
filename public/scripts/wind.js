'use strict'

export default class wind{

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
    
  }

  // 바람을 조절한다.
  adjWind = (adjWind) => {
    this.adjWind = adjWind;
  }

  // 바람을 초기화한다.
  resetWind = () =>{
    this.wind = 0;
    this.adjWind = 0;
  }

  // 바람을 가져온다.
  getWind = () =>{
    return this.wind + this.adjWind;
  }


}