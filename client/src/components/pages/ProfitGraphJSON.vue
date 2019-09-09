<template>

<div id="app">
 
   
     
  <div class="row">
    <div class="col-sm">
       <h6><i></i> План реализаций на сентябрь 2019г.</h6>  
     <table>
        
    
<tr>
  <td> План: Операционный {{computedplanOper}}</td>
    <td>   Виталий: {{computedPlanVital}}</td>
    
</tr>

     </table>
     

      <div id="chart">
    
    </div>
     </div>
    
      <div class="col-sm">
          <h6><i></i> План по выставленным счетам на сентябрь 2019г.</h6>  
        <JSONinvoice>  </JSONinvoice>
        
  </div>
  
</div>
</div>
  
</template>

<script>
//import scss from '../../assets/scss/materialize.min.css'
import TaskService from '@/services/TaskService'
import JSONinvoice from '../pages/ProfitGraphJSON_invoice.vue'
//import ApexCharts from 'apexcharts'
import datajson from '/home/anikev/Рабочий стол/1/data.json'
import dataInvoice from '/home/anikev/Рабочий стол/1/data_invoise.json'
import firebase from '../Firebase'
import { functions } from 'firebase';


export default {
    data() {
        return {
            components:{
            datainv: dataInvoice
            },
            tasks: [],
            profit: [],
            title: [],
            fact:[],
            factInvoice:[],
            workInvoice:[],
            planInvoice:[],
            myjson: datajson,
            invoice:dataInvoice,
            factOper: 0,
            factVital: 0,
            plan: [],
            planVital: 1800000,
            planOper: 1800000,
            show: false,
            ref: firebase.firestore().collection('tasks'),
            refPlan: firebase.firestore().collection('plan'),

        }
    },
    computed: {
//работа с реализациями
        
        computedPlanVital: function() {
            return this.planVital.toLocaleString()
        },
        computedplanOper: function() {
            return this.planOper.toLocaleString()
        }
        //работа со счетами
    },
    created() {
        //Раздел Реализации 
        
        var obj = this.myjson
        obj = obj.filter(i => i.employee === 'Минаева НВ')

        var arrayProfit = Object.keys(obj).map(function(key) {
            return obj[key].profit;
        });
        console.log(arrayProfit)
        var sum = 0;
        for (var i = 0; i < arrayProfit.length; i++) {
            sum = sum + parseInt(arrayProfit[i]);

        }
        var fact = [];
        fact.push(sum)

        this.factOper = 1800000 - sum
        console.log("Выручка Минаева " + sum)
        var total = 0
        var obj = this.myjson
        obj = obj.filter(i => i.employee === 'Кузнецов Виталий Александрович')
        var arrayProfit = Object.keys(obj).map(function(key) {
            return obj[key].profit;
        });
        console.log(arrayProfit)
        arrayProfit.push(0)
        var sum = 0;
        if (arrayProfit.length) {
            for (var i = 0; i < arrayProfit.length; i++) {
                sum = sum + parseInt(arrayProfit[i]);
                // this.factVital = this.planVital - sum
                var arrVitali = [];
                
            }
            console.log("Выручка Виталий " + sum)
            fact.push(sum)
             this.factVital = 1800000 - sum
        }
       
        



        this.ref.onSnapshot((querySnapshot) => {

            

            var options = {
                chart: {
                    stacked:true,
                    toolbar: {
                        show: true
                    },
                    zoom: {
                        enabled: true
                    },
                    type: 'bar',
                },
                dataLabels: {
                    enabled: true,
                     formatter: function (val, opt) {
              return val.toLocaleString()
            },
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
                    name:"Реализации"
                    
                }, {

                    data: [],
                    name:"План"
                  
                }, ],

                xaxis: {
                  labels: {
                        show: true,
                        align: 'right',
                        minWidth: 0,
                        maxWidth: 160,
                        style: {
                            color: undefined,
                            fontSize: '16px',
                        }
                    },
                    categories: ['Операционный отдел', 'Виталий']
                }

            }
             
            var chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();
            chart.appendData([{
                data: fact
            }, {
                data: [this.factOper,this.factVital]
            }])
     
        
           });
        


    },
    
}
function sum() {
    console.log("Вызов функции")
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
@import '../../assets/materialize.min.scss';

</style>