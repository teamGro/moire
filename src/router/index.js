import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage,
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
