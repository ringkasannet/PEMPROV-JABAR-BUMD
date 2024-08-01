import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BumdView from '../views/BumdView.vue';
import AsetView from '../views/AsetView.vue';
import AdminView from '../views/AdminView.vue';
import InputDokumenView from '../views/InputDokumenView.vue';

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
      component: BumdView,
    },
    {
      path: '/aset',
      name: 'aset',
      component: AsetView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
    },
    {
      path: '/InputDokumen',
      name: 'inputDokumen',
      component: InputDokumenView,
    },
  ],
});

export default router;
