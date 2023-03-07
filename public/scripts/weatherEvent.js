export default class weatherTouchEvent{

    powerLevelText = {
        strong: '강',
        normal: '중',
        weak: '약'
    }

    constructor(weather){

        this.weather = weather;        
        this.powerClick = false;
        this.moveClick = false;
        this.level = 1;
        const $powerBtn = document.getElementById("power-btn");
        
        
        this.$powerBtn = $powerBtn;

        
        $powerBtn.addEventListener('mousedown', (e)=>{
            this.prevX  = e.clientX;
            this.powerClick = !this.powerClick;
            this.moveClick = false;
            
        });

        document.addEventListener('mousedown', (e)=>{
            this.prevY  = e.clientY;
            this.prevX  = e.clientX;
            this.moveClick = true;
            this.windDecrease();
        });
        

        document.addEventListener('mousemove', (e)=>{this.getPowerBtnRelativeY(e)});
        document.addEventListener('mousemove', (e)=>{

            if(this.moveClick == false) return;
            if(this.powerClick == true) return;
            

            const adjWind = (e.clientX-this.prevX)/100 * Math.abs((e.clientX-this.prevX)/100) ;

            if(Math.abs(adjWind) > 30) return;

            this.weather.adjWind = adjWind;
            
        });
        
        document.addEventListener('mouseup', (e)=>{
            this.powerClick = false;
            this.moveClick = false;
            this.weather.adjWind = 0;
        });

    }

    //바람 감소
    windDecrease = () =>{
        if(this.moveClick == true && Math.abs(this.weather.wind) > 1){
            this.weather.wind  = this.weather.wind * 0.99;
            requestAnimationFrame(this.windDecrease);
        }
    }

    //파워 버튼 위치 조정
    getPowerBtnRelativeY = (e) => {
        if (!this.powerClick) {
            return;
        }
        
        
        const bar = document.getElementsByClassName('power-bar')[0].getBoundingClientRect();        
        const level = document.getElementsByClassName('power-level')[0].getBoundingClientRect();    

        
        const posX = this.prevX - e.clientX; 
        
        
        if(bar.right < (level.right - posX) || bar.left > (level.left - posX)){     
            return;
        }


        const indexX = bar.right -level.right;
        const indexXTop = bar.right - bar.left - level.height;
                
        //강
        if(indexXTop/3 > indexX){
            this.powerChange('strong');
        }else if(indexXTop/3*2 < indexX){
            this.powerChange('weak');
        }else{
            this.powerChange('normal');
        }

        this.$powerBtn.style.left = (this.$powerBtn.offsetLeft - posX) + "px";
        this.prevX = e.clientX;
        
    }    

    //파워 변경
    powerChange  =  (level) =>{

        if(level != this.level){
            this.level = level
            this.weather.resetWeatherPower(this.weather.weatherPowerDefinition[level])
            document.getElementsByClassName('power-level')[0].innerHTML = `<div class="power-text">${this.powerLevelText[level]}</div>`;
        }
        

    }

}