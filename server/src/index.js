const config = require('./config/config')
const mongoose = require('mongoose')
const Task = require('./models/task-model')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
//const io = require('socket.io')

const app = express()
//var io = io.listen(app);
mongoose.Promise = global.Promise

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())



mongoose.connect(config.dbURL, config.dbOptions)
mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`)
    
  })
  .on('error', error => console.warn(error))
  const server = app.listen(process.env.PORT || config.port,
    () => console.log(`Server start on port ${config.port} ...`))
    const io = require('socket.io')(server)
io.on('connection', function(socket) {
  console.log(socket.id)
  console.log("Добро пожаловать")
  
});
  app.post('/tasks', (req, res) => {
    const task = new Task({
      taskDate: req.body.taskDate,
      taskNumber: req.body.taskNumber,
      title: req.body.title,
      location : req.body.location,
      planTaskDate : req.body.planTaskDate,
      Docs : req.body.Docs,
      comments : req.body.comments,
      created : req.body.created,
      isActive : req.body.isActive
    })
    task.save((err, data) => {
      if (err) {
        console.log(err)
      } else {
        res.send({
          success: true,
          message: `Post with ID_${data._id} saved successfully!`
        })
      }
    })
  })
  app.get('/tasks', (req, res) => {
    Task.find({}, 'taskDate taskNumber title  location planTaskDate Docs comments isActive', (err, tasks) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({ tasks: tasks })
      }
    }).sort({ _id: -1 })
  })
  app.get('/tasks/:id', (req, res) => {
    console.log(req);
    console.log(res)
    Task.findById(req.params.id,  (err, task) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send(task)
      }
    })
  })
  app.put('/tasks/:id', (req, res) => {
    Task.findById(req.params.id, 'taskDate taskNumber title  location planTaskDate Docs comments isActive', (err, task) => {
      if (err) {
        console.log(err)
      } else {
        if (req.body.taskDate) {
          task.taskDate = req.body.taskDate
        }
        if (req.body.taskNumber) {
          task.taskNumber = req.body.taskNumber
        }
        if (req.body.title) {
          task.title = req.body.title
        }
        if (req.body.location) {
          task.location = req.body.location
        }
        if (req.body.planTaskDate) {
          task.planTaskDate = req.body.planTaskDate
        }
        if (req.body.Docs) {
          task.Docs = req.body.Docs
        }
        if (req.body.comments) {
          task.comments = req.body.comments
        }
      if (req.body.isActive !== undefined){
          task.isActive = req.body.isActive
        }
      }
        
          task.save(err => {
           if (err) {
             res.sendStatus(500)
           } else {
            res.sendStatus(200)
           }
         })

      })
    })
    io.sockets.on('connection', function () {
     console.log("Добро пожаловать")
    });
  

