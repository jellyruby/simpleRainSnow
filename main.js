import express from'express';
import {response} from'express';
const app = express();
import {renderFile} from 'ejs';

app.engine('html', renderFile);
app.set('view engine', 'ejs');
app.use('/public', express.static('public'))


app.listen(9999, function(){

    console.log('start 9999');

});


app.get('/rainsnow',function( request , response ){

    response.render( 'rainsnow.html' );
  
  });
  