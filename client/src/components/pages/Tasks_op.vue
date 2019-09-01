<template>
 

<div id="app">
 
   
     
  <div class="row">
    <div class="col-sm">
       Планируемая выручка
     <table class="table-responsive bordered highlight centered hoverable z-depth-2" >
      <thead>
        <tr>
          <th v-for="column in colPlan">
            {{column}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(el,index) in plan"> 
          <td>{{index}}</td>
          <td>    
            {{el.title}}
          </td>
          <td>
            {{el.profit}}
          </td>
           <td>
            {{fact}}
          </td>
          <td style="display:inline-block;">
          </td>
        </tr>
         </tbody>
          
        <tr>
          <td colspan="2">
            <div class="input-field">
              <input placeholder="Наименование" ref="lname" v-model="input.title" id="lname" type="text">
              <label for="lname"></label>
            </div>
          </td>
          <td>
            <div class="input-field">
              <input placeholder="Сумма" v-model="input.profit" id="fname" type="text">
              <label for="fname"></label>
            </div>
          </td>
           
        </tr>
     
    
        </table>
    </div>
    <div class="col-sm">
     Выручка операционного отдела
     <table class="table-responsive bordered highlight centered hoverable z-depth-2" >
      <thead>
        <tr>
          <th v-for="column in colFact">
            {{column}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(el,index) in tasks"> 
          <td>{{index}}</td>
          <td>    
            {{el.title}}
          </td>
          <td>
            {{el.profit}}
          </td>
          
          <td style="display:inline-block;">
            
            
         
          </td>
        </tr>
         </tbody>
          
        
     
    
        </table>
   
    </div>
    <div class="col-sm">
       Выручка Виталия
       <table class="table-responsive bordered highlight centered hoverable z-depth-2" >
      <thead>
        <tr>
          <th v-for="column in colFact">
            {{column}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(el,index) in tasks"> 
          <td>{{index}}</td>
          <td>    
            {{el.title}}
          </td>
          <td>
            {{el.profit}}
          </td>
           <td>
            {{el.profitFact}}
          </td>
          <td style="display:inline-block;">
            
            
         
          </td>
        </tr>
         </tbody>
          
        
     
    
        </table>
   
    
   
   <tr>
          <td colspan="2">
            <div class="input-field">
              <input placeholder="Наименование" ref="lname" v-model="input.title" id="lname" type="text">
              <label for="lname"></label>
            </div>
          </td>
          <td>
            <div class="input-field">
              <input placeholder="Сумма" v-model="input.profit" id="fname" type="text">
              <label for="fname"></label>
            </div>
          </td>
          <td>
          <div class="input-field">
              <input placeholder="Сотрудник" v-model="input.employee" id="fname" type="text">
              <label for="fname"></label>
            </div>

          </td>
         
        </tr>
    <td><a href="#!" @click="add" class="btn btn-waves green darken-2"><i class="material-icons">+</i></a></td>
 
    </div>
    </div>
     
</div>
  
  
</template>

<script>
//import scss from '../../assets/scss/materialize.min.css'
import TaskService from '@/services/TaskService'

import firebase from '../Firebase'


  export default {
        data() {
       return {
   
         show : false,
          ref: firebase.firestore().collection('tasks'),
          colPlan: ['index','Наименование','Сумма','Факт'],
          colFact: ['index','Наименование','Сумма'],
          plan:[{
            title:"Выручка",
            profit: 40000
          }],
          fact: 0,
          extFact:[{
            title:"Выручка",
            profit: 54
          }],
          
         tasks: [],
         bins: [],
        input: {
        title: "",
        profit: "",
        emploee : "",
         },
       }
   },
  created () {
    this.ref.onSnapshot((querySnapshot) => {
      this.tasks = [];
      this.fact = 0;
      querySnapshot.forEach((doc) => {
        this.tasks.push({
         
          title: doc.data().title,
           profit: doc.data().profit,
          
        });
          console.log(this.tasks)
          this.fact += Number(doc.data().profit);
      });
    });
  },
         methods: {
            
         
    
    add:  async function () {
      this.data = Object.assign({},{"title" :this.input.title,
          "profit":Number(this.input.profit),
          "emploee":this.input.emploee})
        this.ref.add(this.data)
        var factSum = JSON.parse(this.tasks).toString()
       
       for (var i = 0; i < factSum.length; i++) {
        this.fact += factSum[i].profit;
}

alert(sum);
          
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

    
  }
        
  // mounted () {
  //      this.getTasks();
       
  //      //this.activeTasks()
  //   }
  }

//function to sort table data alphabetically
console.log("Готово")
var ordonner = function(a, b) {
  return (a.lname > b.lname);
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
@import '../../assets/materialize.min.css';

</style>
