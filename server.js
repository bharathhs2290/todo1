/**
 * Created by bharath on 1/4/2016.
 */
var express = require('express');
var bodyParser = require('body-parser');

var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;


var todos = [];

var todoNextID = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {

    res.send('ToDo API Root');

});

app.get('/todos', function (req, res) {

    var queryParams = req.query;
    var fileredTODOs = todos;


    if(queryParams.hasOwnProperty('completed') && queryParams.completed==='true'){
        fileredTODOs = _.where(fileredTODOs,{completed:true});
    }
    else if(queryParams.hasOwnProperty('completed') && queryParams.completed==='false'){
        fileredTODOs = _.where(fileredTODOs,{completed:false});
    }

    if(queryParams.hasOwnProperty('q') && queryParams.q.length>0){
        fileredTODOs = _.filter(fileredTODOs,function(arrElements){

            return arrElements.description.indexOf(queryParams.q)>-1;

        });


    }

    res.json(fileredTODOs);
    //res.json(todos);

});


app.get('/todos/:id', function (req, res) {

    var todoid = parseInt(req.params.id);

    var matchedid = _.findWhere(todos, {id: todoid});


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
    if (matchedid) {
        res.json(matchedid);
    }
    else {
        res.status(404).send();
    }


    // res.send('ID Requested : '+ req.params.id);

});

app.delete('/todos/:id', function (req, res) {

    var todoID = parseInt(req.params.id);
    var matchedID = _.findWhere(todos, {id: todoID});

    if (!matchedID) {

        res.status(404).json({"error": "No TODO found with that ID"});
    }

    else {
        todos = _.without(todos, matchedID);
        res.json(matchedID);

    }

});


app.put('/todos/:id', function (req, res) {

    var body = _.pick(req.body, 'description', 'completed');
    var todoID = parseInt(req.params.id);
    var matchedToDo = _.findWhere(todos, {id: todoID});
    var validAttributes = {};

    if(!matchedToDo){
        return res.status(404).send();
    }

    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed;
    }
    else if (body.hasOwnProperty('completed')) {
        return res.status(400).send();
    }

    if (body.hasOwnProperty('description') && body.description.trim().length > 0) {
        validAttributes.description = body.description;
    }
    else
        if (body.hasOwnProperty('description')) {
            return res.status(400).send();
        }
    _.extend(matchedToDo,validAttributes);
    res.json(matchedToDo);

});


app.post('/todos', function (req, res) {

    var body = _.pick(req.body, 'description', 'completed');

    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {

        return res.status(400).send();

    }
    body.description = body.description.trim();
    body.id = todoNextID++;

    todos.push(body);
    console.log('description : ' + body.description);
    res.json(body);

});


app.listen(PORT, function () {
    console.log(' server started on port ' + PORT);

});