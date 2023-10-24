const express = require('express');
const app = express();
// const cors= require('cors');
const mongoose = require('./database/mongoose')
const TaskList = require('./database/models/task-list');
const Task = require('./database/models/task');


/*
CORS- Cross origin  Request Security
Backend- http://localhost:3000
frontend- http://localhost:42000
*/

// var corsOptions = {
//     " origin": "*",
//      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//      "preflightContinue": false,
//      "optionsSuccessStatus": 204,
   
//    }
//    app.use(cors(corsOptions ));
//    app.use((req,res,next)=>{
//     // res.setHeader('Access-Control-Allow-Origin',"*");
//     res.setHeader('Access-Control-Allow-Headers',
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     // res.setHeader("Access-Control-Allow-Methods",
//     // "GET, POST,PATCH,PUT,DELETE,OPTIONS")
//     next();
//   });

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');

    // Pass to next layer of middleware
    next();
});
app.use(express.json());

//Routes
app.get('/tasklists',(req,res)=>{
TaskList.find({ }).then(lists=>{res.send(lists)}).catch((error)=>{
    console.log(error);
})
});


app.listen(3000,()=>{
    console.log('Server started on port 3000');
});
