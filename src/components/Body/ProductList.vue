<template>
  <ul
    class="catalog__list"
    v-for="product in products"
    :key="product.id"
  >
    <product-card :product="product"></product-card>
  </ul>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import ProductCard from './ProductCard.vue';

export default defineComponent({
  components: { ProductCard },
  setup() {
    const store = useStore();
    const products = store.getters.getProducts;

    return {
      products,
    };
  },
});
</script>
