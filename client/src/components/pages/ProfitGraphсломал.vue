<template>

<div id="app">
 
   
     
  <div class="row">
    <div class="col-sm">
     <table>
        
         
<tr>
    <td>  План Виталий: {{computedPlanVital}}</td>
    <td> Операционный {{computedplanOper}}</td>
</tr>
<td>    Остаток: Виталий <b>{{computedFactVital}}</b> </td>
<td>Операционный <b> {{computedFactOper}}</b></td>
     </table>
     

      <div id="chart">
    
    </div>
     </div>
    <div class="col-sm">
        <div id="chart2">
    
      </div>
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
        factOper:0,
        factVital:0,
        plan: [],
        planVital:0,
        planOper: 0,
         show : false,
          ref: firebase.firestore().collection('tasks'),
          refPlan: firebase.firestore().collection('plan'),
          
       }
   },
   computed:{
       
computedFactVital: function () {
    return this.factVital
  },
computedFactOper: function () {
    return this.factOper
  },
computedPlanVital: function () {
    return this.planVital
  },
computedplanOper: function () {
    return this.planOper
  }
   },
  created(){
      this.refPlan.onSnapshot((Snapshot) => {
         this.plan = [];
    
       Snapshot.forEach((doc) => {
         this.plan.push({
            title: doc.data().title,
            profit: doc.data().profit,
            emploee: doc.data().emploee
         
         })
       })
    
    var planVital =this.plan.filter(i => i.emploee ==='Виталий')
    this.planVital = planVital[0].profit

    var planOper =this.plan.filter(i => i.emploee ==='Операционный')
    this.planOper = planOper[0].profit
    
 });
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
    this.factVital = this.planVital - sum
    var  arrVitali = [];

             arrVitali.push(sum)
    

}
        

      //Конвертируем в массив данные Опреационный отдел
      var obj = this.tasks
        obj = obj.filter(i => i.emploee ==='Операционный')
        
        var arrayProfit = Object.keys(obj).map(function(key) {
          return obj[key].profit;
          });
        
        var sum=0;
for(var i=0;i<arrayProfit.length;i++){
    sum = sum + parseInt(arrayProfit[i]);
 this.factOper = this.planOper - sum
 var arrOperacio = [];

            arrOperacio.push(sum)
}
       

       var options = {
  chart: {
          
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
                    style: {
                        colors: ['#000000'],
                        fontSize: '20px'
                    }
                },
                 theme: {
                    mode: 'light',
                    palette: 'palette2',
                    monochrome: {
                        enabled: false,
                        color: '#255aee',
                        shadeTo: 'light',
                        shadeIntensity: 0.65
                    },
                },
                 legend: {
                    
                    fontSize: '16px'
                 },
                 yaxis: {
                    show: true,
                    showAlways: true,
                    seriesName: undefined,
                    opposite: false,
                    reversed: false,
                    logarithmic: false,
                    tickAmount: 6, //количество позиций - делений

                    max: 50000,
                    labels: {
                        show: true,
                        align: 'right',
                        minWidth: 0,
                        maxWidth: 160,
                        style: {
                            color: undefined,
                            fontSize: '16px',
                        
                        }       
                    }
                 },
  
    series: [{
          
          data: [],
          name:'Виталий'
        },{
          
          data: [],
          name: 'Операционный отдел'
        },],
  
  xaxis: {
    categories:  ['','']
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
 
 


    
  },
  
 }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
@import '../../assets/materialize.min.scss';

</style>