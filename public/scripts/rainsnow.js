
import weatherEffect from '/public/scripts/weather.js'

document.addEventListener("DOMContentLoaded", function(){

  new weatherEffect();

});

document.querySelectorAll('.btn').forEach((elem)=>{

    
    elem.addEventListener("mouseover", function() {
    
    console.log("Mouse over canvas");
  });

});
