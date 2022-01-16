<template>
  <header class="header container">
    <div class="header__wrapper">
      <router-link class="header__info" :to="{ name: 'Main' }" tag="span"
        >Каталог</router-link
      >

      <router-link class="header__logo" :to="{ name: 'Main' }">
        <img
          src="img/logo.svg"
          alt="Логотип интернет магазина Moire"
          width="116"
          height="34"
        />
      </router-link>

      <a class="header__tel" href="tel:8 800 600 90 09"> 8 800 600 90 09 </a>

      <Cart />
    </div>
  </header>
</template>

<script>
import { defineComponent } from 'vue';
import Cart from './Cart.vue';

export default defineComponent({
  components: { Cart },
  setup() {},
});
</script>

<style lang="less">
.header__info {
  text-align: left;
}
</style>
