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
            this.prevY  = e.clientY;
            this.powerClick = true;
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

    windDecrease = () =>{
        if(this.moveClick == true && Math.abs(this.weather.wind) > 1){
            this.weather.wind  = this.weather.wind * 0.99;
            requestAnimationFrame(this.windDecrease);
        }
    }

    getPowerBtnRelativeY = (e) => {
        if (!this.powerClick) {
            return;
        }
        
        const bar = document.getElementsByClassName('power-bar')[0].getBoundingClientRect();
        const level = document.getElementsByClassName('power-level')[0].getBoundingClientRect();

        const posY = this.prevY - e.clientY; 
        
        
        if(bar.bottom < (level.bottom - posY) || bar.top > (level.top - posY)){     
            return;
        }


        const indexY = bar.bottom -level.bottom;
        const indexYTop = bar.bottom - bar.top - level.height;
                
        //강
        if(indexYTop/3 > indexY){
            this.powerChange('strong');
        }else if(indexYTop/3*2 < indexY){
            this.powerChange('weak');
        }else{
            this.powerChange('normal');
        }

        this.$powerBtn.style.top = (this.$powerBtn.offsetTop - posY) + "px";
        this.prevY = e.clientY;
        
    }    


    powerChange  =  (level) =>{

        if(level != this.level){
            this.level = level
            this.weather.resetWeatherPower(this.weather.weatherPowerDefinition[level])
            document.getElementsByClassName('power-level')[0].innerHTML = `<div class="power-text">${this.powerLevelText[level]}</div>`;
        }
        

    }

}