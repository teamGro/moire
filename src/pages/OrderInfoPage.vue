<template>
  <div class="content__top">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link class="breadcrumbs__link" :to="{ name: 'Main' }">
          Каталог
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <router-link class="breadcrumbs__link" :to="{ name: 'Basket' }">
          Корзина
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <a class="breadcrumbs__link"> Оформление заказа </a>
      </li>
    </ul>

    <h1 class="content__title">
      Заказ оформлен <span>№ {{ info.id }}</span>
    </h1>
  </div>

  <section class="cart">
    <form class="cart__form form" action="#" method="POST">
      <div class="cart__field">
        <p class="cart__message">
          Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет
          письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами
          в&nbsp;течение часа для уточнения деталей доставки.
        </p>

        <ul class="dictionary">
          <li class="dictionary__item">
            <span class="dictionary__key"> Получатель </span>
            <span class="dictionary__value"> {{ info.name }} </span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key"> Адрес доставки </span>
            <span class="dictionary__value">
              {{ info.address }}
            </span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key"> Телефон </span>
            <span class="dictionary__value"> {{ info.phone }} </span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key"> Email </span>
            <span class="dictionary__value"> {{ info.email }} </span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key"> Способ оплаты </span>
            <span class="dictionary__value"> {{ info.paymentType }} </span>
          </li>
        </ul>
      </div>

      <div class="cart__block">
        <ul class="cart__orders">
          <li
            class="cart__order"
            v-for="product in info.basket.items"
            :key="product.id"
          >
            <h3>{{ product.product.title }}</h3>
            <b>{{ formatNumber(product.price) }} ₽</b>
            <span>Артикул: 150030</span>
          </li>
        </ul>

        <div class="cart__total">
          <p>
            Доставка: <b>{{ normalizeDelivery() }}</b>
          </p>
          <p>
            Итого: <b>{{ info.basket.items.length }}</b> товара на сумму
            <b>{{ formatNumber(info.totalPrice) }} ₽</b>
          </p>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import formatNumber from '@/helpers/formatNumber';

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const info = computed(() => store.state.orderInfo || []);

    function checkOrderInfo() {
      if (store.state.orderInfo) return;

      store.dispatch('getOrderInfo', route.params.id);
    }

    checkOrderInfo();

    function normalizeDelivery() {
      if (info.value.deliveryType.price === 0) {
        return 'бесплатно';
      }

      return `${formatNumber(info.value.deliveryType.price)} ₽`;
    }

    return {
      info,
      formatNumber,
      normalizeDelivery,
    };
  },
});
</script>
