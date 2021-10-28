<template>
  <a
    class="header__cart"
    href="cart.html"
    aria-label="Корзина с товарами"
  >
    <svg
      width="19"
      height="24"
    >
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span
      class="header__count"
      aria-label="Количество товаров"
    >{{ getBasketAmount || 0 }}</span>
  </a>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();

    store.dispatch('getBasketAmount');
    const basketAmount = store.getters.getBasketAmount;

    return {
      basketAmount,
    };
  },
});
</script>
