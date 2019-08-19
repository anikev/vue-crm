import api from '@/services/api'
export default {
    fetchTasks () {
      return api().get('tasks')
    },
    addNewTask (params) {
      return api().post('tasks', params)
    }

  }