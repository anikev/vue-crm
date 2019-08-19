const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  description: {
    type: String
  }
})

const TaskModel = mongoose.model('tasks', TaskSchema)
module.exports = TaskModel