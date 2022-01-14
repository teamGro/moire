import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import BasketPage from '@/pages/BasketPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';

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
  {
    path: '/basket',
    name: 'Basket',
    component: BasketPage,
  },
  {
    path: '/order',
    name: 'Order',
    component: OrderPage,
  },
  {
    path: '/orderInfo/:id',
    name: 'OrderInfo',
    component: OrderInfoPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
