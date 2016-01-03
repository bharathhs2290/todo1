/**
 * Created by bharath on 1/4/2016.
 */
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;



var todos =[];

var todoNextID = 1;

app.use(bodyParser.json());

app.get('/',function(req,res){

    res.send('ToDo API Root');

});

app.get('/todos',function(req,res){

   res.json(todos);

});


app.get('/todos/:id',function(req,res){

    var todoid = parseInt(req.params.id);
    var matchedid;

    todos.forEach(function(listcheck){
        if(listcheck.id===todoid)
        {
            matchedid=listcheck;

        }

    });
    if(matchedid){
        res.json(matchedid);   }
        else{
        res.status(404).send();}


   // res.send('ID Requested : '+ req.params.id);

});

app.post('/todos',function(req,res){

var body =req.body;
    body.id=todoNextID++;

    todos.push(body);
    console.log('description : '+ body.description);
    res.json(body);

});





app.listen(PORT,function(){
    console.log(' server started on port ' + PORT);

});