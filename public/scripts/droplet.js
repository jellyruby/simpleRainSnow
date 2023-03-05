import precipitation from './precipitation.js';



// 비 1개에 대한 클래스
export default class Droplet extends precipitation {
  constructor(canvas,ctx,weatherEffectObj) {
    super(canvas,ctx,weatherEffectObj);
    this.length = Math.random() * 8 + 5;

    this.setOldXY();
  }

  groundfall(){
    // delete this;    
    this.deleted = true;
  }


  draw() {
    const ctx = this.ctx;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.moveTo(this.oldx, this.oldy);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();

    this.setOldXY();
  }
  
  setOldXY(){
    this.oldx = this.x;
    this.oldy = this.y;
  }


}
