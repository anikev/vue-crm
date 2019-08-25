<template>
 

<div id="app">
  <h4 class="head"> Список задач для склада</h4>
 <button v-on:click="show = !show">
    Переключить
  </button>
    
  
  <div class="container">
   <table class="table-responsive bordered highlight centered hoverable z-depth-2" >
      <thead>
        <tr>
          <th v-for="column in columns">
            {{column}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task,index) in tasks"> 
          <td>{{index}}</td>
          <td>
            {{task.taskDate}}
          </td>
          <td>
            {{task.taskNumber}}
          </td>
          <td>
            {{task.title}}
          </td>
          <td>
            {{task.location}}
          </td>
          <td>
            {{task.planTaskDate}}
          </td>
          <td>
            {{task.Docs}}
          </td>
          <td>
            {{task.comments}}
          </td>
         
          <td style="display:inline-block;">
            
            <a href="#!" class="btn waves-effect waves-light blue darken-2 b_archive" @click="archive(index)"><i class="material-icons">-</i></a>
            <a href="#!" class="btn waves-effect waves-light blue darken-2 b_edit" @click="select(index)"><i class="material-icons">выделить</i></a>
          </td>
        </tr>
         </tbody>
        </table>
        <table>
        <tr>
          <td colspan="2">
            <div class="input-field">
              <input placeholder="Дата" ref="lname" v-model="input.taskDate" id="lname" type="text">
              <label for="lname"></label>
            </div>
          </td>
          <td>
            <div class="input-field">
              <input placeholder="Номер" v-model="input.taskNumber" id="fname" type="text">
              <label for="fname"></label>
            </div>
          </td>
           <td>
            <div class="input-field">
              <input placeholder="Суть" v-model="input.title" id="fname" type="text">
              <label for="fname"></label>
            </div>
          </td>
           <td>
            <div class="input-field">
              <input placeholder="Место" v-model="input.location" id="fname" type="text">
              <label for="fname"></label>
            </div>
          </td>
           <td>
            <div class="input-field">
              <input placeholder="Дата исполнения" v-model="input.planTaskDate" id="fname" type="text">
              <label for="fname"></label>
            </div>
          </td>
           <td>
            <div class="input-field">
              <input placeholder="Документы" v-model="input.Docs" id="fname" type="text">
              <label for="fname"></label>
            </div>
          </td>
           <td>
            <div class="input-field">
              <input placeholder="Примечание" v-model="input.comments" id="fname" type="text">
              <label for="fname"></label>
            </div>
          </td>
           
         
          
          
          <td><a href="#!" @click="add" class="btn btn-waves green darken-2"><i class="material-icons">+</i></a></td>
        </tr>
     
    </table>

    <table class="table-responsive centered bordered striped highlight z-depth-1 hoverable"  v-if="show">
      <thead>
        <tr>
          <th v-for="column in columns">
            {{column}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bin,index) in bins"> 
          <td>{{index}}</td>
         <td>
            {{bin.taskDate}}
          </td>
          <td>
            {{bin.taskNumber}}
          </td>
          <td>
            {{bin.title}}
          </td>
          <td>
            {{bin.location}}
          </td>
          <td>
            {{bin.planTaskDate}}
          </td>
          <td>
            {{bin.Docs}}
          </td>
          <td>
            {{bin.comments}}
          </td>
          
          <td>
            <a href="#!" @click="restore(index)" class="btn waves-effect waves-light blue darken-2"><i class="material-icons">Восстановить</i>
            </a>
           
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div id="modal" class="modal modal-fixed-footer">
    <div class="modal-content">
      <h4 class="center-align">Edit</h4>
      <p class="center-align">Edition form. Update informations</p>
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s6">
              <input placeholder="" id="last_name" type="text" v-model="input.title">
              <label for="last_name">Last Name</label>
            </div>
            <div class="input-field col s6">
              <input placeholder="" id="first_name" type="text" v-model="input.description">
              <label for="first_name">First Name</label>
            </div>
          </div>
        
        </form>
      </div>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
      <a href="#!" @click="update" class="btn waves-effect waves-light"><i class="material-icons">edit</i></a>
    </div>
  </div>
</div>
</template>

<script>
//import scss from '../../assets/scss/materialize.min.css'
import TaskService from '@/services/TaskService'
import io from 'socket.io-client';

  export default {
        data() {
       return {
         socket : io('localhost:3001'),
         show : false,

          columns: ['Индекс',
          'Дата приема получения',
          'Номер поручения',
          'Суть поручения',
          'Место исполнения',
          'Плановая дата исполнения',
          'Документы',
          'Примечание'],
         tasks: [],
         bins: [],
        input: {
        title: "",
        description: "",
        checked : true,
         },
       }
   },
         methods: {
            sendMessage(e) {
            e.preventDefault();
        },
            async getTasks () {
        const response = await TaskService.fetchTasks()
        var a_activeTasks = response.data.tasks
        var allTasks = response.data.tasks
        //this.tasks = extData
        this.tasks = a_activeTasks.filter(function(u) {
         return u.isActive
     })
     this.bins = allTasks 
     console.log("Готово!")
   
        //activeTasks()
     
        
        
      },
    //function to add data to table
    add:  async function () {
        this.tasks.push({
          taskDate: this.input.taskDate,
          taskNumber: this.input.taskNumber,
          title: this.input.title,
          location: this.input.location,
          planTaskDate: this.input.planTaskDate,
          Docs: this.input.Docs,
          comments: this.input.comments,
          isActive: true,
          }),
            TaskService.addNewTask({
              taskDate: this.input.taskDate,
              taskNumber: this.input.taskNumber,
              title: this.input.title,
              location: this.input.location,
              planTaskDate: this.input.planTaskDate,
              Docs: this.input.Docs,
              comments: this.input.comments,
              created: new Date(),
              isActive: true
              })
    },
        
    //function to handle data edition
    edit: function(index) {
      this.editInput = this.persons[index];
      console.log(this.editInput);
      this.persons.splice(index, 1);
    },
    //function to send data to bin
    archive: function(index) {
      this.bins.push(this.tasks[index]);
      this.tasks.splice(index, 1);
     
      TaskService.updateTask({
        _id : this.tasks[index]._id,
        isActive : false
      })
    },
    //function to restore data
    restore: function(index) {
      this.persons.push(this.bin[index]);
      this.bin.splice(index, 1);
      this.bin.sort(ordonner);
    },
    //function to update data
    checked:function(){
      show = !show
    },
    update: function(){
      // this.persons.push(this.editInput);
       this.persons.push({
        lname: this.editInput.lname,
        fname: this.editInput.fname,
        
      });
       for (var key in this.editInput) {
        this.editInput[key] = '';
      }
      this.persons.sort(ordonner);
    },
    //function to defintely delete data 
    deplete: function(index) {
      // console.log(this.bin[index]);
      this.bin.splice(index, 1);
    },
    select: function(index) {
      // console.log(this.bin[index]);
      this.bin.splice(index, 1);
    },
    
    showTasks: function() {
        const response =  TaskService.fetchTasks()
        this.bins = response.data.tasks

        //this.tasks = extData
    },
     activeTasks: function() {
       return this.tasks.filter(function(u) {
         return u.isActive
     })
     }

    
  },
  
  mounted () {
       this.getTasks();
       
       //this.activeTasks()
    }
  }

//function to sort table data alphabetically
console.log("Готово")
var ordonner = function(a, b) {
  return (a.lname > b.lname);
};








    // name: 'TaskService',
    // data() {
    //   return {
       
    //     tasks: [],
    //     bin: [],
    //     input: {
    //     title: "",
    //     description: "",
    //     },
    //   }
    // },

    // methods: {
    //   async getTasks () {
    //     const response = await TaskService.fetchTasks()
    //     this.tasks = response.data.tasks
    //   },
    //         async addTask () {
       
    //       await TaskService.addNewTask({
    //         title: this.input.title,
    //         description: this.input.description
    //       })
    //       this.$router.push({ name: 'Posts' })
    //     }
    // }, 

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
@import '../../assets/materialize.min.css';

</style>
