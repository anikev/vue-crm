import Start from '@/components/pages/StartPage'
import Tasks_op from '@/components/pages/Tasks_op'
import ProfitGraph from '@/components/pages/ProfitGraphJSON'
import Plan from '@/components/pages/Plan'



const routes = [
  {
    path: '/',
    name: 'Start',
    component: Start
  },
  {
    path: '/11',
    name: 'Start',
    component: Tasks_op
  },
  {
    path: '/graph',
    name: 'Start',
    component: ProfitGraph
  },
  {
    path: '/plan',
    name: 'Start',
    component: Plan
  },
]


export default routes