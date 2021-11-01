<template>
  <ul class="catalog__list">
    <product-card
      :product="product"
      v-for="product in products"
      :key="product.id"
    ></product-card>
  </ul>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import ProductCard from './ProductCard.vue';

export default defineComponent({
  components: { ProductCard },
  setup() {
    const store = useStore();

    return {
      products: computed(() => store.getters.getProducts),
    };
  },
});
</script>
