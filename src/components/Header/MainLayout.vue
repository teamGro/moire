<template>
  <header class="header container">
    <div class="header__wrapper">
      <span class="header__info">Каталог</span>

      <a
        class="header__logo"
        href="#"
      >
        <img
          src="img/logo.svg"
          alt="Логотип интернет магазина Moire"
          width="116"
          height="34"
        >
      </a>

      <a
        class="header__tel"
        href="tel:8 800 600 90 09"
      >
        8 800 600 90 09
      </a>

      <Cart />
    </div>
  </header>
</template>

<script>
import { defineComponent } from 'vue';
import Cart from './Cart.vue';

export default defineComponent({
  components: { Cart },
  setup() {

  },
});
</script>
