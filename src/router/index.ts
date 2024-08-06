import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BumdView from '../views/BumdView.vue';
import AsetView from '../views/AsetView.vue';
import AdminView from '../views/AdminView.vue';
import InputDokumenAsetView from '../views/InputDokumenAsetView.vue';
import InputDokumenBumdView from '../views/InputDokumenBumdView.vue';
import ListDokumenBUMDView from '../views/ListDokumenBUMDView.vue';
import ListDokumenAsetView from '../views/ListDokumenAsetView.vue';

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
      path: '/inputDokumenAset',
      name: 'inputDokumenAset',
      component: InputDokumenAsetView,
    },
    {
      path: '/inputDokumenBumd',
      name: 'inputDokumenBumd',
      component: InputDokumenBumdView,
    },
    {
      path: '/listDokumenBUMD',
      name: 'listDokumenBUMD',
      component: ListDokumenBUMDView,
    },
    {
      path: '/listDokumenAset',
      name: 'listDokumenAset',
      component: ListDokumenAsetView,
    },
  ],
});

export default router;
