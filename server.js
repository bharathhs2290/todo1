/**
 * Created by bharath on 1/4/2016.
 */
var express = require('express');

var app = express();
var PORT = process.env.PORT || 3000;

var todos =[{
    description : 'meet mom for lunch',
    completed:false,
    id:1
},
    {
        description:'Go to Market',
        completed:false,
        id:2
    },
    {

        description:'buy Milk',
        completed:true,
        id:3



    }];


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


app.listen(PORT,function(){
    console.log(' server started on port ' + PORT);

});