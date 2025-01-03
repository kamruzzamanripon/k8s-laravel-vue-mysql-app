import UnicornDashboardLayout from '@/components/layout/UnicornDashboardLayout.vue'
import Dashboard from '@/views/DashBoard.vue'
import TestBoard from '@/views/TestBoard.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'', 
      component: UnicornDashboardLayout,
      children:[
        {path:'', component:Dashboard},
        {path:'/test', component:TestBoard},
      ]
    }
  ]
})

export default router
