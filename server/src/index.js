const config = require('./config/config')
const mongoose = require('mongoose')
const Task = require('./models/task-model')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

mongoose.Promise = global.Promise

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())



mongoose.connect(config.dbURL, config.dbOptions)
mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`)
    app.listen(process.env.PORT || config.port,
      () => console.log(`Server start on port ${config.port} ...`))
  })
  .on('error', error => console.warn(error))

  app.post('/tasks', (req, res) => {
    const task = new Task({
      title: req.body.title,
      description: req.body.description
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
    Task.find({}, 'title description', (err, tasks) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({ tasks: tasks })
      }
    }).sort({ _id: -1 })
  })


