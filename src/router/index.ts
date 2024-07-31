import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue' 
import BumdView from '../views/BumdView.vue' 
import AsetView from '@/views/AsetView.vue'
console.log("in router/index.ts")
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/bumd',
      name: 'bumd',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: BumdView
    },
    {
      path: '/aset',
      name: 'aset',
      component: AsetView,
    },


  ]
})

export default router
