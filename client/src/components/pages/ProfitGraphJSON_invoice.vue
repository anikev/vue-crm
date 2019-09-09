<template>

  <div>
  
        
     <table>
<tr>
    <td>План: Операционный {{computedplanOper}}</td>
    <td>План Виталий: {{computedPlanVital}}</td>
    
</tr>
   
     </table>
      <div id="chart3">
    </div>
     </div>


  
</template>

<script>
import dataInvoice from '/home/anikev/Рабочий стол/1/data_invoise.json'
import firebase from '../Firebase'
import { functions} from 'firebase';

  export default{
    data(){
      return{
        invoice:dataInvoice,
         ref: firebase.firestore().collection('tasks'),
         planVital:2450000,
         planOper:2450000,
         
         
      }
    },
    computed:{
      
        computedPlanVital: function() {
            return this.planVital.toLocaleString()
        },
        computedplanOper: function() {
            return this.planOper.toLocaleString()
        }
    },
    created(){
  
        //Только в работе
        consoleLog();
        var obj = this.invoice
        console.log("obj" +obj)
        var m_InWork = obj
        .filter(i =>  i.employee === 'Минаева НВ')
        .filter(i =>  i.inWork === true)
        // var arrayProfit = Object.keys(m_InWork).map(function(key) {
        //     return m_InWork[key].profit;
        // });
        
        var sum = 0
        var tempSum = 0
        for (var i = 0; i < m_InWork.length; i++) {
            sum = sum + parseInt(m_InWork[i].profit);

        }
        var workInvoice = [];
        
        workInvoice.push(sum)
        
        tempSum = sum

        /////////////////////////////////////////////////////
        // только счета Минаева
        var m_invoice = obj
        .filter(i =>  i.employee === 'Минаева НВ')
          .filter(i =>  i.inWork === false)
//   var arrayProfit = Object.keys(m_invoice).map(function(key) {
//             return m_invoice[key].profit;
//         });
        
        var sum = 0;
        for (var i = 0; i < m_invoice.length; i++) {
            sum = sum + parseInt(m_invoice[i].profit);

        }
        var Invoice = [];
        Invoice.push(sum)

        tempSum = tempSum + sum;
        var fact=[]
        fact.push(this.planOper - tempSum)
        tempSum = 0



        ///////////////////////
        
        var v_InWork = obj

        .filter(i =>  i.employee === 'Кузнецов Виталий Александрович')
        .filter(i =>  i.inWork === true)
        // var arrayProfit = Object.keys(v_InWork).map(function(key) {
        //     return v_InWork[key].profit;
        // });
        
        var sum = 0;
        for (var i = 0; i < v_InWork.length; i++) {
            sum = sum + parseInt(v_InWork[i].profit);

        }
        workInvoice.push(sum)
        tempSum = sum
                
        //Только счета Кузнецов
        var v_invoice = obj
        .filter(i =>  i.employee === 'Кузнецов Виталий Александрович')
        .filter(i =>  i.inWork === false)
        // var arrayProfit = Object.keys(v_invoice).map(function(key) {
        //     return v_invoice[key].profit;
        // });
        
        var sum = 0;
        for (var i = 0; i < v_invoice.length; i++) {
            sum = sum + parseInt(v_invoice[i].profit);

        }
           Invoice.push(sum)
           tempSum = tempSum + sum
           fact.push(this.planVital - tempSum)

           consoleLog();

           this.ref.onSnapshot((querySnapshot) => {

              var options = {
                chart: {
                    
                  //  height:500, 
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
                        fontSize: '16px'
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

                    max: 2450000,
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
                    name:"Счета в работе"
                    
                },{

                    data: [],
                    name:"Открытые счета"
                  
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

           var chart = new ApexCharts(document.querySelector("#chart3"), options);
            chart.render();
            chart.appendData([{
                data: workInvoice
            }, {
                data: Invoice
            },{
                data: fact
            }])
           })
    
  }
  
  }
  function consoleLog() {
    console.log("Вызов функции")
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
@import '../../assets/materialize.min.scss';

</style>