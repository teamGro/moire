<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"> {{ productsQty }} товара </span>
      </div>
    </div>

    <div class="content__catalog">
      <filters v-model:page="page"></filters>

      <section class="catalog">
        <product-list></product-list>

        <base-pagination
          v-model:page="page"
          :productsPerPage="productsPerPage"
          :count="productsQty"
        ></base-pagination>
      </section>
    </div>
  </main>
</template>

<script>
import {
  defineComponent, computed, ref, watch,
} from 'vue';
import { useStore } from 'vuex';
import Filters from '@/components/Body/Filters.vue';
import ProductList from '@/components/Body/ProductList.vue';
import BasePagination from '@/components/Body/BasePagination.vue';

export default defineComponent({
  components: { Filters, ProductList, BasePagination },
  setup() {
    const store = useStore();
    const page = ref(1);
    const filters = computed(() => store.state.filters);

    store.dispatch('getProducts', filters);

    watch(page, (value) => {
      store.commit('updateFilters', { page: value });
      store.dispatch('getProducts', filters);
    });

    return {
      productsQty: computed(() => store.state.productsQty || 0),
      page,
      productsPerPage: filters.value.limit,
    };
  },
});
</script>
