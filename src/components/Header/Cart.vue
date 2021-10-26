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
    >3</span>
  </a>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {

  },
});
</script>
