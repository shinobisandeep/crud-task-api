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

//Route or Endpoint for getting  a Tasklist by id:  http://localhost:3000/tasklists/653e50d7893ff925ceece5a0

app.get('/tasklists/:tasklistId',(req,res)=>{
    let tasklistId = req.params.tasklistId;
    TaskList.find({_id:tasklistId}).then((taskList)=>{
        res.status(200);
        res.send(taskList)
    }).catch((error)=>{  console.log(error);})
})
//Route or Endpoint for creating a Tasklist

app.post('/tasklists',(req,res)=>{
    console.log('Im inside post api',req.body)
    let tasklistObj = {'title':req.body.title  };
TaskList(tasklistObj).save().then((lists)=>{res.status(201); res.send(lists)
    }
).catch((error)=>{
    console.log(error);
})
});


//Put is full update of object
//Route or Endpoint for updating Tasklist with id: http://localhost:3000/tasklists/653e50d7893ff925ceece5a0
app.put('/tasklists/:tasklistId',(req,res)=>{
 TaskList.findOneAndUpdate({_id:req.params.tasklistId},{$set:req.body}, { new: true }).then((lists)=>{res.status(200); res.send(lists)}).catch((error)=>{
    console.log(error);
})
});

//patch is partial update of one field of an object
app.patch('/tasklists/:tasklistId',(req,res)=>{
    TaskList.findOneAndUpdate({_id:  req.params.tasklistId},{$set:req.body}, { new: true }).then((lists)=>{res.status(200); res.send(lists)}).catch((error)=>{
       console.log(error);
   })
   })

//Delete a tasklist by id
app.delete('/tasklists/:tasklistId',(req,res)=>{
    TaskList.findByIdAndDelete({_id:  req.params.tasklistId}).then((lists)=>{res.status(200); res.send(lists)}).catch((error)=>{
       console.log(error);
   })
   })


app.listen(3000,()=>{
    console.log('Server started on port 3000');
});
