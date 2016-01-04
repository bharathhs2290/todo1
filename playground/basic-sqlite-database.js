/**
 * Created by bharath on 1/4/2016.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': 'basic-sqlite-database.sqlite'
});


var Todo = sequelize.define('todo',{

    description:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{

           len: [1,250]
        }



    },
    completed:{
        type: Sequelize.BOOLEAN,
         allowNull:false,
        defaultValue: false
    }
});


sequelize.sync({}).then(function () {

    console.log("Everything is synced");


    Todo.findById(4).then(function(resul){
if(resul)
        {console.log(resul.toJSON())}
else
console.log('not found');


    });

//    Todo.create({
//        description:'take bread'
//       // completed:true
//
//    }).then(function(todo){
//
//      return Todo.create({
//          description:'clean office'
//
//      });
//    }).then(function(){
////return Todo.findById(1)
//return Todo.findAll({
//    where:{
//        description:{
//
//
//            $like:'%bread%'
//        }
//    }
//
//
//});
//    }).then(function(todo){
//        if(todo) {
//            todo.forEach(function(ArrElem){
//
//                console.log(ArrElem.toJSON());
//
//            });
//
//        }
//        else
//        {
//            console.log('no todo found');
//        }
//
//    })




});


