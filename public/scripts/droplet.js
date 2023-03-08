import precipitation from './precipitation.js';



// 비 1개에 대한 클래스
export default class Droplet extends precipitation {
  constructor(canvas,ctx,weatherEffectObj) {
    super(canvas,ctx,weatherEffectObj);
    this.length = Math.random() * 8 + 5;

    this.setOldXY();
  }

  // 비가 땅에 닿으면 삭제
  groundfall(){
    // delete this;    
    this.deleted = true;
  }

  // 비가 땅에 닿았는지 확인
  draw() {
    const ctx = this.ctx;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.oldx, this.oldy);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();

    this.setOldXY();
  }
  
  // 이전 좌표 저장
  setOldXY(){
    this.oldx = this.x;
    this.oldy = this.y;
  }


}
