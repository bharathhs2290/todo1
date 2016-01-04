/**
 * Created by bharath on 1/4/2016.
 */
var express = require('express');
var bodyParser = require('body-parser');

var _ = require('underscore');

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

    var  matchedid = _.findWhere(todos,{id:todoid});


    //var matchedid;
    //
    //todos.forEach(function(listcheck){
    //    if(listcheck.id===todoid)
    //    {
    //        matchedid=listcheck;
    //
    //    }
    //
    //});
    if(matchedid){
        res.json(matchedid);   }
        else{
        res.status(404).send();}


   // res.send('ID Requested : '+ req.params.id);

});

app.delete('/todos/:id', function (req,res){

    var todoID = parseInt(req.params.id);
var matchedID = _.findWhere(todos,{id:todoID});

    if(!matchedID){

        res.status(404).json({"error":"No TODO found with that ID"});
    }

else
    {
        todos = _.without(todos,matchedID);
        res.json(matchedID);

    }

});

app.post('/todos',function(req,res){

var body = _.pick(req.body,'description','completed');

    if(!_.isBoolean(body.completed)|| !_.isString(body.description) || body.description.trim().length===0){

        return res.status(400).send();

    }
body.description=body.description.trim();
    body.id=todoNextID++;

    todos.push(body);
    console.log('description : '+ body.description);
    res.json(body);

});





app.listen(PORT,function(){
    console.log(' server started on port ' + PORT);

});