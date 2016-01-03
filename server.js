/**
 * Created by bharath on 1/4/2016.
 */
var express = require('express');

var app = express();
var PORT = process.env.PORT || 3000;


app.get('/',function(req,res){

    res.send('ToDo API Root');

});

app.listen(PORT,function(){
    console.log(' server started on port ' + PORT);

});