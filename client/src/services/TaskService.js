import api from '@/services/api'
export default {
    fetchTasks () {
      return api().get('tasks')
    },
    addNewTask (params) {
      return api().post('tasks', params)
    },
    getTask (params) {
      return api().get(`tasks/${params.id}`)
    },
    updateTask (params) {
      return api().put(`tasks/${params._id}`, params)
    }

  }