<template>
  
<div id="app">
  <h4 class="head"> Application</h4>
  <div class="container">

    <!--   <div class="img-container">
      <img src="data:image/png;base64,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" class="" />
    </div> -->

    <b-table striped hover :items="tasks" >
      <tr>
        <th>2255</th>
      </tr>
    </b-table>

      <tr>
          <td colspan="2">
            <div class="input-field">
              <label for="lname">Title</label>
              <input placeholder="Placeholder" ref="lname" v-model="input.title" id="lname" type="text">
              
            </div>
          </td>
          <td>
            <div class="input-field">
               <label for="fname">Description</label>
              <input placeholder="Placeholder" v-model="input.description" id="fname" type="text">
             
            </div>
          </td>
        
       
          <td><a href="#!" @click="addTask()"  class="btn btn-waves green darken-2"><i class="material-icons">add</i></a></td>
        </tr>

    
</div>
</div>
</template>

<script>
import TaskService from '@/services/TaskService'


  export default {
    name: 'TaskService',
    data() {
      return {
       
        tasks: [],

        input: {
        title: "WADE",
        description: "Johnson",
        },
      }
    },

    methods: {
      async getTasks () {
        const response = await TaskService.fetchTasks()
        this.tasks = response.data.tasks
      },
        async addTask () {
       
          await TaskService.addNewTask({
            title: this.input.title,
            description: this.input.description
          })
          this.$router.push({ name: 'Posts' })
        }
    }, 
        
      
      
  
  mounted () {
      this.getTasks()
    }
  }






</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
