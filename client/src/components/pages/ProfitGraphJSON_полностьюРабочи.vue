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
import datajson from '/home/anikev/Рабочий стол/1/data.json'
import firebase from '../Firebase'


  export default {
        data() {
       return {
        tasks: [],
        profit: [],
        title: [],
         myjson:datajson,
        factOper:0,
        factVital:0,
        plan: [],
        planVital:1800000,
        planOper: 1800000,
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



    var obj = this.myjson
        obj = obj.filter(i => i.employee ==='Минаева НВ')
        
        var arrayProfit = Object.keys(obj).map(function(key) {
          return obj[key].profit;
          });
        console.log(arrayProfit)
        var sum=0;
for(var i=0;i<arrayProfit.length;i++){
    sum = sum + parseInt(arrayProfit[i]);

}
        var arrOperacio = [];
        arrOperacio.push(sum)

    this.factOper = 1800000 - sum
        console.log("Выручка Минаева " + sum)
    


    var total = 0
        var obj = this.myjson
        obj = obj.filter(i => i.employee ==='Кузнецов Виталий Александрович')
        var arrayProfit = Object.keys(obj).map(function(key) {
          return obj[key].profit;
          });
          console.log(arrayProfit)
         arrayProfit.push(0) 
        var sum=0;
        if (arrayProfit.length){
for(var i=0;i<arrayProfit.length;i++){
    sum = sum + parseInt(arrayProfit[i]);
   // this.factVital = this.planVital - sum
    var  arrVitali = [];

             arrVitali.push(sum)
             
}
 console.log("Выручка Виталий " + sum)
        }
    
 
 this.ref.onSnapshot((querySnapshot) => {
     
      //Конвертируем в массив данные Виталий
       

    
      
        

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

                    max: 1800000,
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