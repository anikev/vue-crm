<template>

<div id="app">
 
   
     
  <div class="row">
    <div class="col-sm">
      <div id="chart">
    
    </div>
     </div>
    <div class="col-sm">
     Выручка операционного отдела
    
    <button @click="addToMassive()">Добавить значение</button>
    </div>
  </div>
</div>
  
</template>

<script>
//import scss from '../../assets/scss/materialize.min.css'
import TaskService from '@/services/TaskService'
import ApexCharts from 'apexcharts'

import firebase from '../Firebase'


  export default {
        data() {
       return {
         tasks: [],
        
        profit: [],
        title:[],
         options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: 'series-1',
        data: [4,55]
      }],
    
    
   
         show : false,
          ref: firebase.firestore().collection('tasks'),
          
          
          
        
         
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
          this.fact += Number(doc.data().profit);
      });
        var obj = this.tasks
        var arrayTitle = Object.keys(obj).map(function(key) {
          return obj[key].title;
          });

      
        var arrayProfit = Object.keys(obj).map(function(key) {
          return obj[key].profit;
          });
        var sum=0;
for(var i=0;i<arrayProfit.length;i++){
    sum = sum + parseInt(arrayProfit[i]);

}
          
        console.log(arrayProfit)
        
        var arr = [];
        arr.push(sum)
console.log(arr)
       var options = {
  chart: {
           height: 350,
                type: 'bar',
  },
  dataLabels: {
                enabled: true},
  series: [{
    name: 'sales',
    data: arrayProfit
  }],
  xaxis: {
    categories: []
  }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();
 
    });
  },
         methods: {
getarrayTitle(){


return arrayTitle

}
  }

  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
@import '../../assets/materialize.min.css';

</style>
