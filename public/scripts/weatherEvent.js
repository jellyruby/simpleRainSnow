export default class weatherTouchEvent{

    constructor(weather){

        this.weather = weather;        
        this.powerClick = false;
        this.level = 1;
        const $powerBtn = document.getElementById("power-btn");
        const $power = document.getElementsByClassName("power")[0];
        
        this.$powerBtn = $powerBtn;

        $powerBtn.addEventListener('mousedown',(e)=>{
            this.prevY  = e.clientY;
            this.powerClick = true;
        })
        document.addEventListener('mousemove',(e)=>{this.getPowerBtnRelativeY(e)})
        document.addEventListener('mouseup',(e)=>{this.powerClick = false;})

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

    powerLevelText = {
        strong: '강',
        normal: '중',
        weak: '약'
    }

    powerChange  =  (level) =>{

        if(level != this.level){
            this.level = level
            this.weather.resetWeatherPower(this.weather.weatherPowerDefinition[level])
            document.getElementsByClassName('power-level')[0].innerHTML = `<div class="power-text">${this.powerLevelText[level]}</div>`;
        }
        

    }

}