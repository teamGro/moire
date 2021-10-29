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
    >{{ basketAmount || 0 }}</span>
  </a>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();

    store.dispatch('getBasketAmount');

    return {
      basketAmount: computed(() => store.getters.getBasketAmount),
    };
  },
});
</script>
