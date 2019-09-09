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
            <td><a href="#!" @click="addPlan" class="btn btn-waves green darken-2"><i class="material-icons">+</i></a></td>
        </tr>
        <tr>
          <label>
        <input name="group1" value="Виталий" v-model="input.emploee" type="radio" checked />
        <span>Виталий</span>
      </label>
    
    
      <label>
        <input name="group1" value="Операционный" v-model="input.emploee" type="radio" />
        <span>Операционный отдел</span>
      </label>
        </tr>
     
    
        </table>
    </div>
    <div class="col-sm">
     Фактические данные
     <table class="table-responsive bordered highlight centered hoverable z-depth-2" >
      <thead>
        <tr>
          <th v-for="column in colFact">
            {{column}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr> 
          <td></td>
          <td>    
            Выполнение плана по реализации
          </td>
          <td>
            {{fact}}
          </td>
          <td style="display:inline-block;">
     
          </td>
        </tr>
         </tbody>
        </table>
    </div>
    </div>  
</div>
  
  
</template>

<script>
//import scss from '../../assets/scss/materialize.min.css'
import TaskService from '@/services/TaskService'

import firebase from '../Firebase'


  export default {
    computed:{
Vitali: function () {
    return this.tasks.filter(i => i.emploee ==='Виталий')
  },
  Operatio: function () {
    return this.tasks.filter(i => i.emploee === 'Операционный')
  }
    },
        data() {
       return {
   
         show : false,
          refTasks: firebase.firestore().collection('tasks'),
          refPlan: firebase.firestore().collection('plan'),
          colPlan: ['Индекс','Наименование','Сумма'],
          colFact: ['index','Наименование','Сумма'],
          plan:[],
          fact: 0,
          user:'',
          fact2: 0,
          extFact:[{
            title:"Выручка",
            profit: 54
          }],
          
         tasks: [],
         plan: [],
        input: {
        title: "",
        profit: "",
        emploee : "",
         },
       }
   },
  created () {
    //Заполняем таблицу Tasks
    this.refTasks.onSnapshot((querySnapshot) => {
      this.tasks = [];
      this.fact = 0;
      querySnapshot.forEach((doc) => {
        this.tasks.push({
          title: doc.data().title,
           profit: doc.data().profit,
          emploee : doc.data().emploee,
        });
          this.fact += Number(doc.data().profit);
      });
    });
    //Заполняем таблицу Plan
    this.refPlan.onSnapshot((querySnapshot) => {
      this.plan = [];
      this.fact2 = 0;
      querySnapshot.forEach((doc) => {
        this.plan.push({
          title: doc.data().title,
           profit: doc.data().profit,
          
        });
          this.fact2 += Number(doc.data().profit);
      });
    });
  },
         methods: {
      addTask:  async function () {
      this.data = Object.assign({},{"title" :this.input.title,
          "profit":Number(this.input.profit),
          "emploee":this.input.emploee})
        this.refTasks.add(this.data)
        var factSum = JSON.parse(this.tasks).toString()
       
       for (var i = 0; i < factSum.length; i++) {
        this.fact += factSum[i].profit;
      }         
    },
    addPlan:  async function () {
      this.data = Object.assign({},{
          "title" :this.input.title,
          "profit":Number(this.input.profit),
          "emploee":this.input.emploee
          })
        this.refPlan.add(this.data)
               
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
@import '../../assets/materialize.min.scss';

</style>
