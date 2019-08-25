const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  taskDate: String,
  taskNumber : Number,
  title : String,
  location: String,
  planTaskDate : String,
  Docs : String,
  comments : String,
  created:  String,
  isActive: Boolean
  
})

const TaskModel = mongoose.model('tasks', TaskSchema)
module.exports = TaskModel