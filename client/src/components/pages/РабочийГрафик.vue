<template>

<div id="app">
 
   
     
  <div class="row">
    <div class="col-sm">
        
       

      <div id="chart">
    
    </div>
     </div>
    <div class="col-sm">
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
        title: [],
        fact:[],
        plan: [],
         show : false,
          ref: firebase.firestore().collection('tasks'),
          refPlan: firebase.firestore().collection('plan'),
          
       }
   },
  created () {
   
  },
  mounted(){
 this.ref.onSnapshot((querySnapshot) => {
      this.tasks = [];
      this.fact = 0;
      querySnapshot.forEach((doc) => {
        this.tasks.push({
           title: doc.data().title,
           profit: doc.data().profit,
           emploee: doc.data().emploee,
        });
         
      });
      //Конвертируем в массив данные Виталий
        var total = 0
        var obj = this.tasks
        obj = obj.filter(i => i.emploee ==='Виталий')
        var arrayProfit = Object.keys(obj).map(function(key) {
          return obj[key].profit;
          });
          
        var sum=0;
for(var i=0;i<arrayProfit.length;i++){
    sum = sum + parseInt(arrayProfit[i]);
total = total + sum
}
        var arrVitali = [];
        arrVitali.push(sum)

      //Конвертируем в массив данные Опреационный отдел
      var obj = this.tasks
        obj = obj.filter(i => i.emploee ==='Операционный')
        
        var arrayProfit = Object.keys(obj).map(function(key) {
          return obj[key].profit;
          });
        
        var sum=0;
for(var i=0;i<arrayProfit.length;i++){
    sum = sum + parseInt(arrayProfit[i]);

}
        var arrOperacio = [];
        arrOperacio.push(sum)
        total = total + sum
        this.fact = total

       var options = {
  chart: {
          stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
              ,  type: 'bar',
  },
  dataLabels: {
                enabled: true,
               fontSize: 200
                },
  
    series: [{
          
          data: [],
          name:'Виталий'
        },{
          
          data: [],
          name: 'Операционный отдел'
        },],
  
  xaxis: {
    categories:  ['']
  }
}
var chart = new ApexCharts(document.querySelector("#chart"), options);

  
chart.render();
chart.appendData([{
   data: arrVitali
  }, {
    data: arrOperacio
  }])
});
// this.refPlan.onSnapshot((Snapshot) => {
//         this.plan = [];
    
//       Snapshot.forEach((doc) => {
//         this.plan.push({
//            title: doc.data().title,
//            profit: doc.data().profit
          
//         })
//       })
     
// });
 


    
  },
  
 }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
@import '../../assets/materialize.min.scss';

</style>